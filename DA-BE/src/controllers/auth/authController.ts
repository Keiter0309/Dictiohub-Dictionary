import { Request, Response } from "express";
import {
  IUser,
  ILogin,
  IResetPassword,
  IForgotPassword,
  IChangePassword,
} from "../../interface/User";
import { User } from "../../model/User/User";
import { sendMail } from "../../utils/mailer";
import { randomOtpDigit } from "../../utils/randomOtpDigit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      role: "users",
    };

    try {
      await User.create(data);

      // Send welcome email
      await sendMail(
        email,
        "Welcome to Our Platform!",
        `Hello ${firstName},
        
        Welcome to Our Platform! We're excited to have you on board.
        
        Here are some resources to get you started:
        - Visit our website: https://www.ourplatform.com
        - Check out our help center: https://www.ourplatform.com/help
        - Join our community forum: https://www.ourplatform.com/forum
        
        If you have any questions, feel free to reply to this email or contact our support team at support@ourplatform.com.
        
        Best regards,
        The Our Platform Team`,
        `<p>Hello ${firstName},</p>
             <p>Welcome to <strong>Our Platform</strong>! We're excited to have you on board.</p>
             <p>Here are some resources to get you started:</p>
             <ul>
                 <li>Visit our website: <a href="https://www.ourplatform.com">https://www.ourplatform.com</a></li>
                 <li>Check out our help center: <a href="https://www.ourplatform.com/help">https://www.ourplatform.com/help</a></li>
                 <li>Join our community forum: <a href="https://www.ourplatform.com/forum">https://www.ourplatform.com/forum</a></li>
             </ul>
             <p>If you have any questions, feel free to reply to this email or contact our support team at <a href="mailto:support@ourplatform.com">support@ourplatform.com</a>.</p>
             <p>Best regards,<br>The Our Platform Team</p>`
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
        return res.status(404).json({
          message: "User not found",
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

      // Generate token
      const token = jwt.sign(
        {
          email: existingUser.email,
          password: existingUser.password,
        },
        process.env.JWT_SECRET || "",
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token: token,
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
      await sendMail(
        email,
        "Password Reset OTP",
        `Hello ${existingUser.firstName},
            
            Your OTP for resetting your password is ${otp}.
            
            If you did not request this OTP, please ignore this email.
            
            Best regards,
            The Our Platform Team`,
        `<p>Hello ${existingUser.firstName},</p>
            <p>Your OTP for resetting your password is <strong>${otp}</strong>.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
            <p>Best regards,<br>The Our Platform Team</p>`
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
      await sendMail(
        email,
        "Password Reset Successful",
        `Hello ${existingUser.firstName},
            
            This is to notify you that your password has been successfully reset.
            
            If you did not request this password reset, please contact our support team immediately.
            
            Best regards,
            The Our Platform Team`,
        `<p>Hello ${existingUser.firstName},</p>
            <p>This is to notify you that your password has been successfully reset.</p>
            <p>If you did not request this password reset, please contact our support team immediately.</p>
            <p>Best regards,<br>The Our Platform Team</p>`
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
      await sendMail(
        email,
        "Password Change Succesful",
        `Hello ${existingUser.firstName},
            This is to notify you that your password has been successfully changed.

            If you did not request this password change, please contact our support team immediately.

            Best regards,
            The Our Platform Team`,
        `<p>Hello ${existingUser.firstName},</p>
            <p>This is to notify you that your password has been successfully changed.</p>
            <p>If you did not request this password change, please contact our support team imeediately.</p>
            <p>Best regards, <br> The Our Platform Team</p>`
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
}

export default new AuthController();
