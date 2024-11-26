import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AudioController {
  public static async getAudio(req: Request, res: Response) {
    const { word, dialect } = req.query;

    if (!word || !dialect) {
      return res.status(400).json({ error: "Invalid query parameters" });
    }

    const audioPath = `${word}-${dialect}.mp3`;

    try {
        const audio = await prisma.pronunciation.findFirst({
            where: {
                audioPath: audioPath,
            },
        })

        if (!audio) {
            return res.status(404).json({ error: "Audio not found" });
        }

        return res.status(200).sendFile(audioPath, { root: "audio" });
    } catch (err) {
        console.error("Error fetching audio:", err);
        return res.status(500).json({ error: "Error fetching audio" });
    }
  }
}

export default AudioController;