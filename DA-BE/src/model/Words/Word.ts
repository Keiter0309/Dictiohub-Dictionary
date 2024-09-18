import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Words {
  static async fetchAll(page: number = 1, pageSize: number = 10) {
    try {
      const words = await prisma.words.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return words;
    } catch (error) {
      console.error('Error fetching all words:', error);
      throw new Error('Error fetching all words');
    }
  }

  static async fetchById(id: number) {
    try {
      const word = await prisma.words.findUnique({
        where: {
          id: id,
        },
      });
      return word;
    } catch (error) {
      console.error('Error fetching word by ID:', error);
      throw new Error('Error fetching word by ID');
    }
  }

//   static async fetchByWord(word: string) {
//     try {
//       const wordRecord = await prisma.words.findUnique({
//         where: {
//           word: word,
//         },
//       });
//       return wordRecord;
//     } catch (error) {
//       console.error('Error fetching word:', error);
//       throw new Error('Error fetching word');
//     }
//   }

  static async create(data: any) {
    try {
      const newWord = await prisma.words.create({
        data: data,
      });
      return newWord;
    } catch (error) {
      console.error('Error creating word:', error);
      throw new Error('Error creating word');
    }
  }

  static async update(id: number, data: any) {
    try {
      const updatedWord = await prisma.words.update({
        where: {
          id: id,
        },
        data: data,
      });
      return updatedWord;
    } catch (error) {
      console.error('Error updating word:', error);
      throw new Error('Error updating word');
    }
  }

  static async delete(id: number) {
    try {
      const deletedWord = await prisma.words.delete({
        where: {
          id: id,
        },
      });
      return deletedWord;
    } catch (error) {
      console.error('Error deleting word:', error);
      throw new Error('Error deleting word');
    }
  }

  static async deleteAll() {
    try {
      const result = await prisma.words.deleteMany();
      return result;
    } catch (error) {
      console.error('Error deleting all words:', error);
      throw new Error('Error deleting all words');
    }
  }

  static async search(word: string, page: number = 1, pageSize: number = 10) {
    try {
      const words = await prisma.words.findMany({
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
      console.error('Error searching words:', error);
      throw new Error('Error searching words');
    }
  }
}