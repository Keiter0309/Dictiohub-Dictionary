import { Request, Response } from "express";
import { User } from "../../model/User/User";
import { Words } from "../../model/Words/Word";
import { ILogin, IUser } from "../../interface/User";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AdminUserController {
  public static async fetchAllUsers(req: Request, res: Response) {
    try {
      const users = (await User.fetchAll()) as ILogin[];
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          users: users.map((user) => {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role,
              lastLogin: user.lastLogin,
            };
          }),
        },
      });
    } catch (err: any) {
      return res.status(500).json({ error: "Error fetching all users" });
    }
  }

  public static async fetchUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const user = (await User.fetchById(id)) as IUser;
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err: any) {
      return res.status(500).json({ error: "Error fetching user" });
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const user = (await User.delete(id)) as IUser;
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Error deleting user" });
    }
  }

  public static async updateUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const user = (await User.update(id, req.body)) as IUser;
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Error updating user" });
    }
  }

  public static async createUser(req: Request, res: Response) {
    const { firstName, lastName, username, email, password, role } = req.body;
    try {
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        role: role
      })

      const existingUsername = await User.fetchByUsername(username);
      if (existingUsername) {
        return res.status(400).json({
          message: "Username already taken",
        });
      }

      const existingEmail = await User.fetchByEmail(email);
      if (existingEmail) {
        return res.status(400).json({
          message: "Email already taken",
        });
      }

      const hashedPassword = bycrypt.hashSync(password, 10);

      

    } catch (err) {
      return res.status(500).json({ error: "Error creating user" });
    }
  }

  public static async searchUsers(req: Request, res: Response) {
    const username = req.query.username as string;
    if (!username) {
      return res
        .status(400)
        .json({ error: "Username query parameter is required" });
    }

    try {
      const users = (await User.search(username)) as IUser[];
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          users: users.map((user) => {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role,
            };
          }),
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Error searching users" });
    }
  }
}

export class AdminWordController {
  public static async getAllWords(req: Request, res: Response) {
    try {
      const words = await Words.fetchAllWords();
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          words: words,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Error fetching all words" });
    }
  }

  public static async createWord(req: Request, res: Response) {
    const {
      word,
      meaning,
      definitionText,
      partOfSpeech,
      categoryName,
      exampleText,
      audioPath,
      dialect,
      ipaText,
      usageExample,
      synonyms,
      antonyms,
    } = req.body;
    try {
      const newWord = await Words.create({
        word: word,
        meaning: { meaningText: meaning },
        definition: {
          definitionText: definitionText,
          partOfSpeech: partOfSpeech,
          usageExample: usageExample,
        },
        category: { categoryName: categoryName },
        example: { exampleText: exampleText },
        pronunciation: {
          audioPath: audioPath,
          ipaText: ipaText,
          dialect: dialect,
        },
        synonymsantonyms: { synonyms: synonyms, antonyms: antonyms },
      });
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          word: newWord,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Error creating word" });
    }
  }
}

export class AdminAuthController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = (await User.fetchByEmail(email)) as ILogin;
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isInvalidPassword = bycrypt.compareSync(password, user.password);

      if (!isInvalidPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      if (user.role !== "admin") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Generate Token
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET || "",
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      // last login
      const lastLogin = new Date();
      await User.updateLastLogin(email, lastLogin);

      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          access_token: token,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Error logging in user" });
    }
  }
}
