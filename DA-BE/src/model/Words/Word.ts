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

  static async getAllWords() {
    try {
      const words = await prisma.word.findMany();
      const exampleWords = await prisma.exampleWord.findMany();
      const pronunciations = await prisma.pronunciation.findMany();
      const definitions = await prisma.definition.findMany();
      const wordCategories = await prisma.wordCategory.findMany();
      const synonymsAntonyms = await prisma.synonymsAntonyms.findMany();
      const meaning = await prisma.meaning.findMany();

      return {
        words,
        exampleWords,
        pronunciations,
        definitions,
        wordCategories,
        synonymsAntonyms,
        meaning,
      };
    } catch (error) {
      console.error("Error fetching all words:", error);
      throw new Error("Error fetching all words");
    }
  }

  static async fetchAllWords(page: number, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const words = await prisma.word.findMany({
        skip,
        take: limit,
      });

      const exampleWords = await prisma.exampleWord.findMany({
        skip,
        take: limit,
      });

      const pronunciations = await prisma.pronunciation.findMany({
        skip,
        take: limit,
      });

      const definitions = await prisma.definition.findMany({
        skip,
        take: limit,
      });

      const wordCategories = await prisma.wordCategory.findMany({
        skip,
        take: limit,
      });

      const synonymsAntonyms = await prisma.synonymsAntonyms.findMany({
        skip,
        take: limit,
      });

      const meaning = await prisma.meaning.findMany({
        skip,
        take: limit,
      });

      const totalWords = await prisma.word.count();
      const totalExampleWords = await prisma.exampleWord.count();
      const totalPronunciations = await prisma.pronunciation.count();
      const totalDefinitions = await prisma.definition.count();
      const totalWordCategories = await prisma.wordCategory.count();
      const totalSynonymsAntonyms = await prisma.synonymsAntonyms.count();
      const totalMeanings = await prisma.meaning.count();

      return {
        data: {
          words,
          exampleWords,
          pronunciations,
          definitions,
          wordCategories,
          synonymsAntonyms,
          meaning,
        },
        meta: {
          totalWords,
          totalExampleWords,
          totalPronunciations,
          totalDefinitions,
          totalWordCategories,
          totalSynonymsAntonyms,
          totalMeanings,
          currentPage: page,
          totalPages: Math.ceil(totalWords / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching all words:", error);
      throw new Error("Error fetching all words");
    }
  }

  static async fetchById(id: number) {
    try {
      // Fetch the word record
      const words = await prisma.word.findUnique({
        where: {
          id: id,
        },
      });

      // Check if the word record exists
      if (!words) {
        throw new Error(`Word not found: ${id}`);
      }

      // Fetch the words related to the word record
      const exampleWords = await prisma.exampleWord.findMany({
        where: {
          wordId: words.id,
        },
      });

      const pronunciations = await prisma.pronunciation.findMany({
        where: {
          wordId: words.id,
        },
      });

      const definitions = await prisma.definition.findMany({
        where: {
          wordId: words.id,
        },
        select: {
          definitionText: true,
          usageExample: true,
          partOfSpeech: true,
        },
      });

      const synonyms = await prisma.synonymsAntonyms.findMany({
        where: {
          wordId: words.id,
        },
        select: {
          synonyms: true,
        },
      });

      const antonyms = await prisma.synonymsAntonyms.findMany({
        where: {
          wordId: words.id,
        },
        select: {
          antonyms: true,
        },
      });

      const meanings = await prisma.meaning.findMany({
        where: {
          wordId: words.id,
        },
      });

      const wordCategories = await prisma.wordCategory.findMany({
        where: {
          wordId: words.id,
        },
      });

      const category = wordCategories.map(
        (category: any) => category.categoryName
      );

      return {
        ...words,
        exampleWords,
        pronunciations,
        definitions,
        synonyms,
        antonyms,
        meanings,
        category,
      };
    } catch (error) {
      console.error("Error fetching word by id:", error);
      throw new Error("Error fetching word by id");
    }
  }

  static async fetchByWord(word: string) {
    try {
      // Fetch the word record
      const words = await prisma.word.findUnique({
        where: {
          word: word,
        },
      });

      // Check if the word record exists
      if (!words) {
        throw new Error(`Word not found: ${word}`);
      }

      // Fetch the words related to the word record
      const exampleWords = await prisma.exampleWord.findMany({
        where: {
          wordId: words.id,
        },
      });

      const pronunciations = await prisma.pronunciation.findMany({
        where: {
          wordId: words.id,
        },
      });

      const definitions = await prisma.definition.findMany({
        where: {
          wordId: words.id,
        },
        select: {
          definitionText: true,
          usageExample: true,
          partOfSpeech: true,
        },
      });

      const synonyms = await prisma.synonymsAntonyms.findMany({
        where: {
          wordId: words.id,
        },
        select: {
          synonyms: true,
        },
      });

      const antonyms = await prisma.synonymsAntonyms.findMany({
        where: {
          wordId: words.id,
        },
        select: {
          antonyms: true,
        },
      });

      const meanings = await prisma.meaning.findMany({
        where: {
          wordId: words.id,
        },
      });

      return {
        ...words,
        exampleWords,
        pronunciations,
        definitions,
        synonyms,
        antonyms,
        meanings,
      };
    } catch (error) {
      console.error("Error fetching word by word:", error);
      throw new Error("Error fetching word by word");
    }
  }

  static async create(word: any) {
    try {
      const newWord = await prisma.word.create({
        data: word,
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
      await prisma.$transaction(async (prisma) => {
        // Delete all related records first
        await prisma.exampleWord.deleteMany({ where: { wordId: id } });
        await prisma.pronunciation.deleteMany({ where: { wordId: id } });
        await prisma.definition.deleteMany({ where: { wordId: id } });
        await prisma.wordCategory.deleteMany({ where: { wordId: id } });
        await prisma.synonymsAntonyms.deleteMany({ where: { wordId: id } });
        await prisma.meaning.deleteMany({ where: { wordId: id } });

        // Delete the word
        await prisma.word.delete({ where: { id: id } });
      });

      return { message: "Word and related records deleted successfully" };
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

      return favorites;
    } catch (error) {
      console.error("Error fetching all favorite words:", error);
      throw new Error("Error fetching all favorite words");
    }
  }

  static async fetchFavoriteById(userId: number) {
    try {
      const favorites = await prisma.favoriteWord.findMany({
        where: {
          userId,
        },
      });
      return favorites;
    } catch (error) {
      console.error(`Error fetching favorite word ${error}`);
      throw new Error(`Error fetching favorite word`);
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
