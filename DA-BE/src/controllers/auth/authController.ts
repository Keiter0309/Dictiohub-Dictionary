import { Request, Response } from "express";
import { SendMailTemplates } from "../../constant/mails/sendmails";
import {
  IUser,
  IResetPassword,
  IForgotPassword,
  IChangePassword,
  ILogin,
} from "../../interface/User";
import { User } from "../../model/User/User";
import { sendMail } from "../../utils/mailer";
import { randomOtpDigit } from "../../utils/randomOtpDigit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../interface/JwtPayload";

class AuthController {
  public async register(req: Request, res: Response) {
    const { firstName, lastName, username, email, password, confirmPassword } =
      req.body as IUser;

    // Check for empty fields
    for (const key in req.body) {
      if (!req.body[key]) {
        return res.status(400).json({
          message: `${key} cannot be empty`,
        });
      }
    }

    // Check if user is already registered
    const existingUser = await User.fetchByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    // Check if username is already taken
    const existingUsername = await User.fetchByUsername(username);
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already taken",
      });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Prepare user data
    const data: IUser = {
      id: 0,
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      role: "viewer",
    };

    try {
      await User.create(data);

      // Send welcome email
      const mailOptions = SendMailTemplates.MAIL_REGISTRATION(firstName);
      await sendMail(
        email,
        mailOptions.subject,
        mailOptions.text,
        mailOptions.html
      );

      return res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error registering user",
      });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Check if email password empty
    if (!email || !password) {
      return res.status(401).json({
        message: "Email, password are required",
      });
    }

    try {
      // Check user is existing
      const existingUser = (await User.fetchByEmail(email)) as ILogin;

      if (!existingUser) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      // Check password is correct
      const isPasswordValid = bcrypt.compareSync(
        password,
        existingUser.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      const payload = {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      };

      // Generate token
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
      });

      // Last Login
      const lastLogin = new Date();
      await User.updateLastLogin(email, lastLogin);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      return res.status(200).json({
        status_code: 200,
        message: "Login successful",
        access_token: token,
        data: {
          id: existingUser.id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "An error occurred while loggin in",
      });
    }
  }

  public async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    // Check for empty email field
    if (!email) {
      return res.status(401).json({
        message: "Email is required",
      });
    }
    try {
      // Check existing user
      const existingUser = (await User.fetchByEmail(email)) as IForgotPassword;

      if (!existingUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Generate a random one-time password
      const otp = randomOtpDigit();

      // Save the otp to the user's data
      await User.saveOTP(email, otp);

      // Send OTP to the email
      const mailOptions = SendMailTemplates.MAIL_FORGOT_PASSWORD(
        existingUser.firstName,
        otp
      );
      await sendMail(
        email,
        mailOptions.subject,
        mailOptions.text,
        mailOptions.html
      );

      return res.status(200).json({
        message: "OTP sent to email",
      });
    } catch (err) {
      return res.status(500).json({
        message: "An error occurred while forgot password",
      });
    }
  }

  public async resetPassword(req: Request, res: Response) {
    const { email, otp, password, confirmPassword } = req.body;

    // Check for empty fields
    if (!otp || !password || !confirmPassword) {
      return res.status(400).json({
        message: "OTP, Password and confirm password are required",
      });
    }

    try {
      // Check existing user
      const existingUser = (await User.fetchByEmail(email)) as IResetPassword;

      if (!existingUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (otp !== existingUser.resetPasswordOTP) {
        return res.status(401).json({
          message: "OTP invalid",
        });
      }

      if (new Date() > existingUser.resetPasswordExpires) {
        return res.status(401).json({
          message: "OTP expired",
        });
      }

      // Check password, confirm password
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Password do not match",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      // Update password
      await User.updatePassword(email, hashedPassword);

      // Send email notification
      const mailOptions = SendMailTemplates.MAIL_RESET_PASSWORD(
        existingUser.firstName
      );
      await sendMail(
        email,
        mailOptions.subject,
        mailOptions.text,
        mailOptions.html
      );

      return res.status(200).json({
        message: "Password reset successful",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "An error occurred while reseting password",
      });
    }
  }

  public async changePassword(req: Request, res: Response) {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    // Check empty fields
    for (const key in req.body) {
      if (!req.body[key]) {
        return res.status(400).json({
          message: `${key} is required`,
        });
      }
    }

    try {
      // Check existing user
      const existingUser = (await User.fetchByEmail(email)) as IChangePassword;

      if (!existingUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Check new password and current password
      const isPasswordValid = bcrypt.compareSync(
        newPassword,
        existingUser.password
      );
      if (isPasswordValid) {
        return res.status(400).json({
          message: "New password is required",
        });
      }

      // Check old password and existing password
      const passwordValid = bcrypt.compareSync(
        oldPassword,
        existingUser.password
      );

      if (!passwordValid) {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }

      // Check new password and confirm password
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          message: "Password do not match",
        });
      }

      // Hashed password
      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      // Update password
      await User.updatePassword(email, hashedPassword);

      // Send email notification
      const mailOptions = SendMailTemplates.MAIL_CHANGE_PASSWORD(
        existingUser.firstName
      );
      await sendMail(
        email,
        mailOptions.subject,
        mailOptions.text,
        mailOptions.html
      );

      return res.status(200).json({
        message: "Password change succesful",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "An error occurred while changing password",
      });
    }
  }

  public async getMe(req: Request & {user?: JwtPayload}, res: Response) {
    try {
      // Get user data from token
      const user = req.user as JwtPayload;

      const existingUser = (await User.fetchByEmail(user.email)) as IUser;
      console.log(existingUser);
      if (!user) {
        return res.status(401).json({
          status_code: 401,
          message: "Unauthorized",
        });
      }

      const payload = {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        joined: existingUser.createdAt,
        role: existingUser.role,
      }
      
      return res.status(200).json({
        status_code: 200,
        message: "User data",
        data: payload,
      });
    } catch (err: any) {
      return res.status(500).json({
        status_code: 500,
        message: "Internal server error",
        error: err.message,
      });
    }
  }
}

export default new AuthController();
