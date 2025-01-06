export enum EWord {
  WORD = 'api/v1/word/:id',
  WORD_READ = 'api/v1/word/read',
  WORD_LIST = 'api/v1/words',
  WORD_CREATE = 'api/v1/word/create',
  WORD_UPDATE = 'api/v1/word/update',
  WORD_DELETE = 'api/v1/word/delete',
  WORD_SEARCH = 'api/v1/words/search',
  WORD_FAVORITE = 'api/v1/words/favorite',
  WORD_DELETE_FAVORITE = 'api/v1/words/favorite',
  WORD_SEARCH_LOGS = 'api/v1/words/search-log',
}

const WORD_CLIENT_HOST: string = import.meta.env.VITE_API_BASE_URL;

export { WORD_CLIENT_HOST };
