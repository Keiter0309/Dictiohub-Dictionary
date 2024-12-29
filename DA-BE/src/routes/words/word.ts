import { Router } from "express";
import { EWords } from "../../enums/EWords/EWords";
import WordsController from "../../controllers/words/wordsController";
export const wordsRoute = Router();

wordsRoute.get(EWords.WORDS, WordsController.getAllWords);
wordsRoute.post(EWords.CREATE_WORD, WordsController.createWord);
wordsRoute.put(EWords.WORD, WordsController.updateWord);
wordsRoute.get(EWords.SEARCH, WordsController.searchWords);
wordsRoute.post(EWords.ADD_FAVORITE, WordsController.addFavorite);
wordsRoute.get(EWords.FETCH_FAVORITE, WordsController.fetchAllFavorites);
wordsRoute.delete(EWords.DELETE_FAVORITE, WordsController.deleteFavorite);
