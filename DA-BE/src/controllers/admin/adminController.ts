import { Request, Response } from "express";
import { User } from "../../model/User/User";
import { Words } from "../../model/Words/Word";
import { ILogin, IUser } from "../../interface/User";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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

  public static async fetchUserByEmail(req: Request, res: Response) {
    const email = req.params.email as string;

    try {
      const user = (await User.fetchByEmail(email)) as ILogin;

      if (!user) {
        return res.status(404).json({
          status_code: 404,
          message: "User not found",
        });
      }

      const data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
        lastIP: user.lastIP,
        wordAdded: user.wordAdded,
      };

      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: data,
      });
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    const email = req.params.email as string;

    // Validate input
    if (!email) {
      return res.status(400).json({
        status_code: 400,
        message: "Email parameter is required",
      });
    }

    try {
      // Check if user exists
      const user = await User.fetchByEmail(email);
      if (!user) {
        return res.status(404).json({
          status_code: 404,
          message: "User not found",
        });
      }

      // Delete the user
      await User.deleteByEmail(email);

      return res.status(200).json({
        status_code: 200,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({
        status_code: 500,
        message: "Error deleting user",
      });
    }
  }

  public static async updateUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { email, firstName, lastName, username, role } = req.body;

    // Validate input
    if (!email || !firstName || !lastName || !username || !role) {
      return res.status(400).json({
        status_code: 400,
        message: "All fields are required",
      });
    }

    try {
      // Check if user exists
      const existingUser = await User.fetchById(id);
      if (!existingUser) {
        return res.status(404).json({
          status_code: 404,
          message: "User not found",
        });
      }

      // Update the user
      const updatedUser = (await User.update(id, {firstName, lastName, username, email, role })) as IUser;

      return res.status(200).json({
        status_code: 200,
        message: "User updated successfully",
        data: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          username: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      });
    } catch (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({
        status_code: 500,
        message: "Error updating user",
      });
    }
  }

  public static async createUser(req: Request, res: Response) {
    const { firstName, lastName, username, email, password, role } = req.body;

    // Validate input
    if (!firstName || !lastName || !username || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    try {
      // Check if username already exists
      const existingUsername = await User.fetchByUsername(username);
      if (existingUsername) {
        return res.status(400).json({
          message: "Username already taken",
        });
      }

      // Check if email already exists
      const existingEmail = await User.fetchByEmail(email);
      if (existingEmail) {
        return res.status(400).json({
          message: "Email already taken",
        });
      }

      // Hash the password
      const hashedPassword = bycrypt.hashSync(password, 10);

      // Create the user
      const newUser = (await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        role,
      })) as IUser;

      return res.status(201).json({
        status_code: 201,
        message: "User created successfully",
        data: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({
        message: "Error creating user",
      });
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
  public static async fetchAllWords(req: Request, res: Response) {
    try {
      const words = await Words.fetchAllWords();
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          words: words,
        }
      });
    } catch (err) {
      return res.status(500).json({ error: "Error fetching all words" });
    }
  }

  public static async createWord(req: Request, res: Response) {
    const {
      word,
      meanings,
      definitionText,
      partOfSpeech,
      categoryName,
      exampleText,
      usageExample,
      audioPath,
      dialect,
      ipaText,
      synonyms,
      antonyms,
    } = req.body;
    try {
      const newWord = await prisma.word.create({
        data: {
          word: word,
        }
      });

      const newPos = await prisma.partOfSpeech.create({
        data: {
          partOfSpeech: partOfSpeech,
        }
      })

      const newMeaning = await prisma.meaning.create({
        data: {
          wordId: newWord.id,
          meaningText: meanings,
        }
      })

      const newDefinition = await prisma.definition.create({
        data: {
          wordId: newWord.id,
          posId: newPos.id,
          definitionText: definitionText,
          partOfSpeech: partOfSpeech,
          usageExample: usageExample,
        }
      })

      const newCategory = await prisma.category.create({
        data: {
          categoryName: categoryName,
        }
      })

      const newExample = await prisma.exampleWord.create({
        data: {
          wordId: newWord.id,
          exampleText: exampleText,
          source: " ",
        }
      })

      const newPronunciation = await prisma.pronunciation.create({
        data: {
          wordId: newWord.id,
          audioPath: audioPath,
          ipaText: ipaText,
          dialect: dialect,
        }
      })

      const newSynonymsAntonyms = await prisma.synonymsAntonyms.create({
        data: {
          wordId: newWord.id,
          synonyms: synonyms,
          antonyms: antonyms,
        }
      })

      return res.status(201).json({
        status_code: 201,
        message: "Word created successfully",
        data: {
          word: newWord,
          meaning: newMeaning,
          definition: newDefinition,
          category: newCategory,
          example: newExample,
          pronunciation: newPronunciation,
          synonymsAntonyms: newSynonymsAntonyms,
        }
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

      const payload = {
        id: user.id,
        role: user.role,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "15m",
      });

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
