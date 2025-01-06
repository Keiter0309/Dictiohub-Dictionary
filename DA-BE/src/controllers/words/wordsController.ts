import { Request, Response } from "express";
import { Words, Favorites } from "../../model/Words/Word";
import { JwtPayload } from "../../interface/JwtPayload";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class WordsController {
  // Create a new word
  public async createWord(req: Request, res: Response) {
    const { word, meaning, updatedBy } = req.body;

    try {
      const newWord = await Words.create({
        word: word,
        meaning: meaning,
        updatedBy: updatedBy,
      });
      return res.status(201).json(newWord);
    } catch (err) {
      res.status(500).json({ error: "Error creating word" });
    }
  }

  // Get all words
  public async getAllWords(req: Request, res: Response) {
    try {
      const words = await Words.getAllWords();
      return res.status(200).json(words);
    } catch (err) {
      res.status(500).json({ error: "Error fetching all words" });
    }
  }

  // Update a word
  public async updateWord(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { word, meaning, updatedBy } = req.body;
    try {
      const updatedWord = await Words.update(id, {
        word: word,
        meaning: meaning,
        updatedBy: updatedBy,
      });
      return res.status(200).json(updatedWord);
    } catch (err) {
      res.status(500).json({ error: "Error updating word" });
    }
  }

  // Delete a word
  public async deleteWord(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const deletedWord = await Words.delete(id);
      return res.status(200).json(deletedWord);
    } catch (err) {
      res.status(500).json({ error: "Error deleting word" });
    }
  }

  public async searchWords(
    req: Request & { user?: JwtPayload },
    res: Response
  ) {
    const word = req.query.word as string;
    const user = req.user?.id as unknown as number;
    if (!word) {
      return res
        .status(400)
        .json({ error: "Word query parameter is required" });
    }

    try {
      const words = await Words.fetchByWord(word);
      const searchDateTimestamp = new Date();

      if (user) {
        await prisma.userSearchHistory.create({
          data: {
            userId: user,
            wordId: words.id,
            searchTime: searchDateTimestamp,
          },
        });
      }

      return res.status(200).json(words);
    } catch (err) {
      console.error("Error fetching word:", err);
      return res.status(500).json({ error: "Error fetching word" });
    }
  }

  public async addFavorite(
    req: Request & { user?: JwtPayload },
    res: Response
  ) {
    const id = req.body.wordId;
    const userId = req.user?.id as unknown as number;

    try {
      const favorite = await Favorites.addFavorite(id, userId);
      return res.status(200).json(favorite);
    } catch (err) {
      res.status(500).json({ error: "Error adding favorite" });
    }
  }

  public async fetchAllFavorites(
    req: Request & { user?: JwtPayload },
    res: Response
  ) {
    const userId = req.user?.id as unknown as number;

    try {
      const favorites = await Favorites.fetchFavoriteById(userId);
      const wordIds = favorites.map(
        (favorite: { wordId: any }) => favorite.wordId
      );

      if (wordIds.length === 0) {
        return res.status(200).json({
          status_code: 200,
          message: "No favorite words found",
          words: [],
        });
      }

      const words = await Promise.all(
        wordIds.map((id: number) => Words.fetchById(id))
      );

      const selectedFields = words.map((word: any) => ({
        word: word.word,
      }));

      return res.status(200).json({
        status_code: 200,
        message: "Fetch data successfully",
        words: selectedFields,
      });
    } catch (err: any) {
      console.error("Error fetching favorite words:", err);
      return res.status(500).json({
        error: "Error fetching all favorite words",
      });
    }
  }

  public async deleteFavorite(req: Request, res: Response) {
    const id = req.body.wordId;
    const userId = req.body.userId;

    try {
      await Favorites.deleteFavorite(id, userId);
      return res.status(200).json({
        message: "Favorite deleted successfully",
      });
    } catch (err: any) {
      console.error("Error deleting favorite:", err);
    }
  }

  public async fetchSearchLog(
    req: Request & { user?: JwtPayload },
    res: Response
  ) {
    try {
      const user = req.user?.id as unknown as number;
      const searchLogs = await prisma.userSearchHistory.findMany({
        where: {
          userId: user,
        },
        include: {
          word: true,
        },
      });

      return res.status(200).json({
        status_code: 200,
        message: "Fetch data successfully",
        searchLogs: searchLogs,
      });
    } catch (err: any) {
      console.error(`Error fetching search log: ${err}`);
      return res.status(500).json({
        message: "Error fetching search log",
      });
    }
  }
}

export default new WordsController();
