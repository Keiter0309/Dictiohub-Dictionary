export interface WordRowProps {
  item: Word & {
    definitionText?: string[];
    meaningText?: string[];
    partOfSpeech?: string[] | string[][];
    usageExample?: string[];
    categoryNames?: string[];
    synonyms?: string[];
    antonyms?: string[];
    ipa?: string[];
    dialect?: string[];
    audioPath?: string[];
  };
}
export interface WordRowComponentProps extends WordRowProps {
  index: number;
}
export interface Definition {
  id: number;
  wordId: number;
  postId: number;
  partOfSpeech: string[];
  usageExample: string;
  definitionText: string;
}

export interface Meaning {
  id: number;
  wordId: number;
  meaningText: string;
}

export interface ExampleWord {
  id: number;
  wordId: number;
  exampleText: string;
}

export interface Pronunciation {
  id: number;
  wordId: number;
  audioPath: string;
  dialect: string;
  ipaText: string;
}

export interface SynonymAntonym {
  id: number;
  wordId: number;
  synonyms: string;
  antonyms: string;
}

export interface WordCategory {
  id: number;
  wordId: number;
  categoryName: string;
  categoryId?: number;
}

export interface Word {
  id: number;
  word: string;
  meanings: Meaning[];
  definitions: Definition[];
  exampleWords: ExampleWord[];
  pronunciations: Pronunciation[];
  synonymsAntonyms: SynonymAntonym[];
  wordCategories: WordCategory[];
}
