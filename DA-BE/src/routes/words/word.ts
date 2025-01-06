import { Router } from "express";
import { EWords } from "../../enums/EWords/EWords";
import WordsController from "../../controllers/words/wordsController";
import {
  authenticateToken,
  optionalAuth,
} from "../../middlewares/auth/authMiddleware";
export const wordsRoute = Router();

wordsRoute.get(EWords.WORDS, WordsController.getAllWords);
wordsRoute.post(EWords.CREATE_WORD, WordsController.createWord);
wordsRoute.put(EWords.WORD, WordsController.updateWord);
wordsRoute.get(EWords.SEARCH, optionalAuth, WordsController.searchWords);
wordsRoute.get(
  EWords.FETCH_SEARCH_LOG,
  optionalAuth,
  WordsController.fetchSearchLog
);
wordsRoute.post(
  EWords.ADD_FAVORITE,
  authenticateToken,
  WordsController.addFavorite
);
wordsRoute.get(
  EWords.FETCH_FAVORITE,
  optionalAuth,
  WordsController.fetchAllFavorites
);
wordsRoute.delete(EWords.DELETE_FAVORITE, WordsController.deleteFavorite);
