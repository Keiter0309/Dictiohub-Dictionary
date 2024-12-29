import { Request, Response } from "express";
import { Words, Favorites } from "../../model/Words/Word";

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

  public async searchWords(req: Request, res: Response) {
    const word = req.query.word as string;
    if (!word) {
      return res
        .status(400)
        .json({ error: "Word query parameter is required" });
    }

    try {
      const words = await Words.fetchByWord(word);
      return res.status(200).json(words);
    } catch (err) {
      console.error("Error fetching word:", err);
      return res.status(500).json({ error: "Error fetching word" });
    }
  }

  public async addFavorite(req: Request, res: Response) {
    const id = req.body.wordId;
    const userId = req.body.userId;

    try {
      const favorite = await Favorites.addFavorite(id, userId);
      return res.status(200).json(favorite);
    } catch (err) {
      res.status(500).json({ error: "Error adding favorite" });
    }
  }

  public async fetchAllFavorites(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    try {
      const favorites = await Favorites.fetchAll(userId);
      return res.status(200).json({
        data: {
          wordId: favorites.map((favorite: { wordId: any }) => favorite.wordId),
          userId: favorites.map((favorite: { userId: any }) => favorite.userId),
        },
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ error: "Error fetching all favorite words" });
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
}

export default new WordsController();
