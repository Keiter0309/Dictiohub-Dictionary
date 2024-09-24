import { Request, Response } from "express";
import { User } from "../../model/User/User";
import { Words } from "../../model/Words/Word";
import { IUser } from "../../interface/User";

export class AdminUserController {
  public static async fetchAllUsers(req: Request, res: Response) {
    try {
      const users = (await User.fetchAll()) as IUser[];
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
    try {
      const user = (await User.create(req.body)) as IUser;
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
        const { word, meaning, updatedBy } = req.body;
        try {
            const newWord = await Words.create({
                word: word,
                meaning: meaning,
                updatedBy: updatedBy,
            });
            return res.status(200).json({
                status_code: 200,
                message: "success",
                data: {
                    word: newWord,
                },
            })
        } catch (err) {
            return res.status(500).json({ error: "Error creating word" });
        }
    }
}