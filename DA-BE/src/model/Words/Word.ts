import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Words {
  static async fetchAll(page: number = 1, pageSize: number = 10) {
    try {
      const words = await prisma.word.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return words;
    } catch (error) {
      console.error("Error fetching all words:", error);
      throw new Error("Error fetching all words");
    }
  }

  static async fetchAllWords() {
    try {
      const words = await prisma.word.findMany();
      const exampleWords = await prisma.exampleWord.findMany();
      const pronunciations = await prisma.pronunciation.findMany();
      const definitions = await prisma.definition.findMany();
      const wordCategories = await prisma.wordCategory.findMany();
      const synonymsAntonyms = await prisma.synonymsAntonyms.findMany();
      const meanings = await prisma.meaning.findMany();

      return {
        words,
        exampleWords,
        pronunciations,
        definitions,
        wordCategories,
        synonymsAntonyms,
        meanings,
      };
    } catch (error) {
      console.error("Error fetching all words:", error);
      throw new Error("Error fetching all words");
    }
  }

  static async fetchByWord(word: string) {
    try {
      // Fetch the word record
      const wordRecord = await prisma.word.findUnique({
        where: {
          word: word,
        },
      });

      // Check if the word record exists
      if (!wordRecord) {
        throw new Error(`Word not found: ${word}`);
      }

      // Fetch the words related to the word record
      const exampleWords = await prisma.exampleWord.findMany({
        where: {
          wordId: wordRecord.id,
        },
      });

      const pronunciationWords = await prisma.pronunciation.findMany({
        where: {
          wordId: wordRecord.id,
        },
      });

      const definitionWords = await prisma.definition.findMany({
        where: {
          wordId: wordRecord.id,
        },
      });

      const wordCategoryWords = await prisma.wordCategory.findMany({
        where: {
          wordId: wordRecord.id,
        },
      });

      const synonymsAntonymsWords = await prisma.synonymsAntonyms.findMany({
        where: {
          wordId: wordRecord.id,
        },
      });

      const meaningWords = await prisma.meaning.findMany({
        where: {
          wordId: wordRecord.id,
        },
      });

      return {
        ...wordRecord,
        exampleWords,
        pronunciationWords,
        definitionWords,
        wordCategoryWords,
        synonymsAntonymsWords,
        meaningWords,
      };
    } catch (error) {
      console.error("Error fetching word by word:", error);
      throw new Error("Error fetching word by word");
    }
  }

  static async create(word: any) {
    try {
      const newWord = await prisma.word.create({
        data: word
      });
      return newWord;
    } catch (error) {
      console.error("Error creating word:", error);
      throw new Error("Error creating word");
    }
  }

  static async update(id: number, data: any) {
    try {
      const updatedWord = await prisma.word.update({
        where: {
          id: id,
        },
        data: data,
      });
      return updatedWord;
    } catch (error) {
      console.error("Error updating word:", error);
      throw new Error("Error updating word");
    }
  }

  static async delete(id: number) {
    try {
      const deletedWord = await prisma.word.delete({
        where: {
          id: id,
        },
      });
      return deletedWord;
    } catch (error) {
      console.error("Error deleting word:", error);
      throw new Error("Error deleting word");
    }
  }

  static async deleteAll() {
    try {
      const result = await prisma.word.deleteMany();
      return result;
    } catch (error) {
      console.error("Error deleting all words:", error);
      throw new Error("Error deleting all words");
    }
  }

  static async search(word: string, page: number = 1, pageSize: number = 10) {
    try {
      const words = await prisma.word.findMany({
        where: {
          word: {
            contains: word,
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return words;
    } catch (error) {
      console.error("Error searching words:", error);
      throw new Error("Error searching words");
    }
  }
}
export class Favorites {
  // Fetch all favorite words
  static async fetchAll(userId: number) {
    try {
      const favorites = await prisma.favoriteWord.findMany({
        where: {
          userId: userId,
        },
      });

      console.log("userId:::", userId);
      return favorites;
    } catch (error) {
      console.error("Error fetching all favorite words:", error);
      throw new Error("Error fetching all favorite words");
    }
  }

  static async deleteFavorite(id: number, userId: number) {
    try {
      const favorite = await prisma.favoriteWord.deleteMany({
        where: {
          wordId: id,
          userId: userId,
        },
      });
      return favorite;
    } catch (error) {
      console.error("Error deleting favorite:", error);
      throw new Error("Error deleting favorite");
    }
  }

  // Add favorite word
  static async addFavorite(id: number, userId: number) {
    try {
      const favorite = await prisma.favoriteWord.create({
        data: {
          wordId: id,
          userId: userId,
        },
      });
      return favorite;
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw new Error("Error adding favorite");
    }
  }

  static async checkFavorite(id: number, userId: number) {
    try {
      const favorite = await prisma.favoriteWord.findMany({
        where: {
          wordId: id,
          userId: userId,
        },
      });
    } catch (err: any) {
      console.error("Error checking favorite:", err);
      throw new Error("Error checking favorite");
    }
  }
}
