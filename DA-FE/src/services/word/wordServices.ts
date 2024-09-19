import axios from "axios";
import { EWord } from "../../enums/Word/EWord";
class WordServices {
  public async searchWord(word: string) {
    try {
      const response = await axios.get(
        `${EWord.WORD_SERVER_HOST}/${EWord.WORD_SEARCH}/?word=${word}`
      );
      console.log(`${EWord.WORD_SERVER_HOST}/${EWord.WORD_SEARCH}`)
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
}

export default new WordServices();
