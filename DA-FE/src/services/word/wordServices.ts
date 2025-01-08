import axios from 'axios';
import { EWord } from '../../enums/Word/EWord';
import { WORD_CLIENT_HOST } from '../../enums/Word/EWord';
class WordServices {
  public async searchWord(word: string) {
    try {
      const response = await axios.get(
        `${WORD_CLIENT_HOST}/${EWord.WORD_SEARCH}/?word=${word}`,
        { withCredentials: true },
      );
      const wordId = response.data.id;
      localStorage.setItem('ord', wordId);
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        throw err.response.data;
      } else {
        throw new Error(err);
      }
    }
  }

  public async getSearchLogs(page: number = 1, limit: number = 10) {
    try {
      const response = await axios.get(
        `${WORD_CLIENT_HOST}/${EWord.WORD_SEARCH_LOGS}`,
        { params: { page, limit }, withCredentials: true },
      );

      if (response) {
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  public async getAllWords() {
    try {
      const response = await axios.get(
        `${WORD_CLIENT_HOST}/${EWord.WORD_LIST}`,
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  public async addFavoriteWord(wordId: number) {
    try {
      const response = await axios.post(
        `${WORD_CLIENT_HOST}/${EWord.WORD_FAVORITE}`,
        { wordId },
        { withCredentials: true },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  public async getFavoriteWords() {
    try {
      const response = await axios.get(
        `${WORD_CLIENT_HOST}/${EWord.WORD_FAVORITE}`,
        { withCredentials: true },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  public async removeFavoriteWord(wordId: number) {
    try {
      const response = await axios.delete(
        `${WORD_CLIENT_HOST}/${EWord.WORD_FAVORITE}`,
        { data: { wordId }, withCredentials: true },
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
