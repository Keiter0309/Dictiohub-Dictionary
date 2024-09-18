import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Words } from "../../model/Words/Word";

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
      const words = await Words.fetchAll();
      return res.status(200).json(words);
    } catch (err) {
      res.status(500).json({ error: "Error fetching all words" });
    }
  }

  // Get word by ID
  //   public async getWordById(req: Request, res: Response) {
  //     const id = parseInt(req.params.id);
  //     try {
  //       const word = await Words.fetchById(id);
  //       return res.status(200).json(word);
  //     } catch (err) {
  //       res.status(500).json({ error: "Error fetching word by ID" });
  //     }
  //   }

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

  // Fuzzy search for words
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
}

export default new WordsController();
