import { Router } from "express";
import { EWords } from "../../enums/EWords/EWords";
import WordsController from "../../controllers/words/wordsController";
export const wordsRoute = Router();

wordsRoute.get(EWords.WORDS, WordsController.getAllWords);
// wordsRoute.get(EWords.WORD, WordsController.getWordById);
wordsRoute.post(EWords.CREATE_WORD, WordsController.createWord);
wordsRoute.put(EWords.WORD, WordsController.updateWord);
wordsRoute.get(EWords.SEARCH, WordsController.searchWords);
