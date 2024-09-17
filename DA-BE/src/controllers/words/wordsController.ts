import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class WordsController {
    // Create a new word
    public async createWord(req: Request, res: Response) {
        const { word, meaning, updatedBy } = req.body
        
        try {
            const newWord = await prisma.words.create({
                data: {
                    word,
                    meaning,
                    updatedBy,
                }
            });
            return res.status(201).json(newWord)
        }
        catch (err) {
            res.status(500).json(
                {error: 'Error creating word'}
            )
        }
    }
}