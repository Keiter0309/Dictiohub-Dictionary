import { Request, Response } from "express";
import { User } from "../../model/User/User";
import { Words } from "../../model/Words/Word";
import { ILogin, IUser } from "../../interface/User";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { PollyService } from "../../services/aws/polly.service";
import path from "path";

const prisma = new PrismaClient();

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
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
      });

      // last login
      const lastLogin = new Date();
      await User.updateLastLogin(email, lastLogin);

      res.cookie("aToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 24,  
      });

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
          joinedAt: user.createdAt,
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
      const updatedUser = (await User.update(id, {
        firstName,
        lastName,
        username,
        email,
        role,
      })) as IUser;

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
      console.error("Error updating user:", err);
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
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Error fetching all words" });
    }
  }

  public static async fetchWord(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const word = await Words.fetchById(id);

      if (!word) {
        return res.status(404).json({ error: "Word not found" });
      }

      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: word,
      });
    } catch (error) {
      console.error("Error fetching word:", error);
      return res.status(500).json({ error: "Error fetching word" });
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
      dialect,
      ipaText,
      synonyms,
      antonyms,
    } = req.body;
    try {
      // Validate input
      if (
        !word ||
        !meanings ||
        !definitionText ||
        !partOfSpeech ||
        !categoryName ||
        !exampleText ||
        !usageExample ||
        !dialect ||
        !ipaText ||
        !synonyms ||
        !antonyms
      ) {
        
        return res.status(400).json({
          status_code: 400,
          message: `All fields are required word`,
        });
      }

      // Create the word
      const newWord = await prisma.word.create({
        data: {
          word: word,
        },
      });

      // Create audio file
      const audio = `${newWord.word}.mp3`;
      const audioPath = path.join(
            `audio/${newWord.word}.mp3`
          );

      await PollyService.synthesizeSpeech(word, audioPath);

      const newPos = await prisma.partOfSpeech.create({
        data: {
          definitionId: newWord.id,
          partOfSpeech: partOfSpeech,
        },
      });

      const newMeaning = await prisma.meaning.create({
        data: {
          wordId: newWord.id,
          meaningText: meanings,
        },
      });

      const newDefinition = await prisma.definition.create({
        data: {
          wordId: newWord.id,
          posId: newPos.id,
          definitionText: definitionText,
          partOfSpeech: partOfSpeech,
          usageExample: usageExample,
        },
      });

      const newCategory = await prisma.category.create({
        data: {
          categoryName: categoryName,
        },
      });

      const newExample = await prisma.exampleWord.create({
        data: {
          wordId: newWord.id,
          exampleText: exampleText,
          source: " ",
        },
      });

      const newPronunciation = await prisma.pronunciation.create({
        data: {
          wordId: newWord.id,
          audioPath: audio,
          ipaText: ipaText,
          dialect: dialect,
        },
      });

      const newSynonymsAntonyms = await prisma.synonymsAntonyms.create({
        data: {
          wordId: newWord.id,
          synonyms: synonyms,
          antonyms: antonyms,
        },
      });

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
        },
      });
    } catch (err) {
      return res.status(500).json({ error: `Error creating word ${err}` });
    }
  }

  public static async deleteWord(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid word ID" });
    }

    try {
      const existingWord = await prisma.word.findUnique({
        where: { id: id },
      });

      if (!existingWord) {
        return res.status(404).json({ error: "Word not found" });
      }

      await prisma.$transaction(async (prisma) => {
        await prisma.meaning.deleteMany({
          where: { wordId: id },
        });

        await prisma.definition.deleteMany({
          where: { wordId: id },
        });

        await prisma.partOfSpeech.deleteMany({
          where: { id: id, definitionId: id },
        });

        const categoryNames = await prisma.wordCategory.findMany({
          where: { wordId: id },
          select: { categoryName: true },
        });

        await prisma.category.deleteMany({
          where: {
            categoryName: { in: categoryNames.map((c) => c.categoryName) },
          },
        });

        await prisma.exampleWord.deleteMany({
          where: { wordId: id },
        });

        await prisma.pronunciation.deleteMany({
          where: { wordId: id },
        });

        await prisma.synonymsAntonyms.deleteMany({
          where: { wordId: id },
        });

        await prisma.word.delete({
          where: { id: id },
        });
      });

      return res.status(200).json({
        status_code: 200,
        message: "Word deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error deleting word" });
    }
  }

  public static async updateWord(req: Request, res: Response) {
    const id = parseInt(req.params.id);
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

    // Validate input
    if (
      !word ||
      !meanings ||
      !definitionText ||
      !partOfSpeech ||
      !categoryName ||
      !exampleText ||
      !usageExample ||
      !audioPath ||
      !dialect ||
      !ipaText ||
      !synonyms ||
      !antonyms
    ) {
      return res.status(400).json({
        status_code: 400,
        message: "All fields are required",
      });
    }

    try {
      await prisma.$transaction(async (prisma) => {
        // Update the word
        const updatedWord = await prisma.word.update({
          where: { id },
          data: { word },
        });

        // Update meanings
        await prisma.meaning.updateMany({
          where: { wordId: id },
          data: { meaningText: meanings },
        });

        // Update part of speech multiple
        await prisma.partOfSpeech.updateMany({
          where: { definitionId: id },
          data: { partOfSpeech },
        });

        // Update definitions
        await prisma.definition.updateMany({
          where: { wordId: id },
          data: { definitionText, usageExample },
        });

        // Update categories
        await prisma.wordCategory.updateMany({
          where: { wordId: id },
          data: { categoryName },
        });

        // Update example words
        await prisma.exampleWord.updateMany({
          where: { wordId: id },
          data: { exampleText },
        });

        // Update pronunciations
        await prisma.pronunciation.updateMany({
          where: { wordId: id },
          data: { audioPath, dialect, ipaText },
        });

        // Update synonyms and antonyms
        await prisma.synonymsAntonyms.updateMany({
          where: { wordId: id },
          data: { synonyms, antonyms },
        });

        return res.status(200).json({
          status_code: 200,
          message: "Word updated successfully",
          data: { word: updatedWord },
        });
      });
    } catch (err) {
      console.error("Error updating word:", err);
      return res.status(500).json({
        status_code: 500,
        message: "Error updating word",
      });
    }
  }
}

export class AdminCategoryController {
  public static async fetchAllCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany();
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: {
          categories: categories,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Error fetching all categories" });
    }
  }

  public static async fetchCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const category = await prisma.category.findUnique({
        where: { id },
      });
      return res.status(200).json({
        status_code: 200,
        message: "success",
        data: category,
      });
    } catch (err) {
      return res.status(500).json({ error: "Error fetching category" });
    }
  }

  public static async createCategory(req: Request, res: Response) {
    try {
      const { categoryName } = req.body;
      if (!categoryName) {
        return res.status(400).json({ error: "Category name is required" });
      }

      const newCategory = await prisma.category.create({
        data: {
          categoryName,
        },
      });

      return res.status(201).json({
        status_code: 201,
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (err) {
      return res.status(500).json({ error: "Error creating category" });
    }
  }

  public static async deleteCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }

      await prisma.category.delete({
        where: { id },
      });

      return res.status(200).json({
        status_code: 200,
        message: "Category deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({ error: "Error deleting category" });
    }
  }

  public static async updateCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { categoryName } = req.body;
      if (!categoryName) {
        return res.status(400).json({ error: "Category name is required" });
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { categoryName },
      });

      return res.status(200).json({
        status_code: 200,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (err) {
      return res.status(500).json({ error: "Error updating category" });
    }
  }
}
