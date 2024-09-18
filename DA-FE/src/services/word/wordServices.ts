import axios from "axios";
import { EWord } from "../../enums/Word/EWord";
class WordServices {
  public async searchWord(word: string) {
    try {
      const response = await axios.get(
        `${EWord.WORD_SERVER_HOST}/${EWord.WORD_SEARCH}/${word}`
      );
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        throw err.response.data;
      } else {
        throw new Error(err);
      }
    }
  }
}

export default new WordServices();
