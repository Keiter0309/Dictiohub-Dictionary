import axios from "axios";
import { EWord } from "../../enums/Word/EWord";
class WordServices {
  public async searchWord(word: string) {
    try {
      const response = await axios.get(
      
        `${EWord.WORD_SERVER_HOST}/${EWord.WORD_SEARCH}/?word=${word}`
      );
      console.log(`${EWord.WORD_SERVER_HOST}/${EWord.WORD_SEARCH}`)
      const wordId = response.data.id;
      localStorage.setItem('ord', wordId)
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        throw err.response.data;
      } else {
        throw new Error(err);
      }
    }
  }

  public async getAllWords() {
    try {
      const response = await axios.get(
        `${EWord.WORD_SERVER_HOST}/${EWord.WORD_LIST}`
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  public async addFavoriteWord(wordId: number, userId: number) {
    try {
      const response = await axios.post(
        `${EWord.WORD_SERVER_HOST}/${EWord.WORD_FAVORITE}`,
        { wordId, userId }
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  public async removeFavoriteWord(wordId: number, userId: number) {
    try {
      const response = await axios.delete(
        `${EWord.WORD_SERVER_HOST}/${EWord.WORD_FAVORITE}`,
        { data: { wordId, userId } }
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
    }
  }
}

export default new WordServices();
