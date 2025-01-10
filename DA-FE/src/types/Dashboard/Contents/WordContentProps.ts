export interface WordContentProps {
  onSubmit: (
    word: string,
    meanings: string,
    definitionText: string,
    partOfSpeech: string,
    categoryNames: string[],
    exampleText: string,
    dialect: string,
    ipaText: string,
    usageExample: string,
    synonyms: string,
    antonyms: string,
  ) => void;
}

export interface WordContentState {
  word: string;
  meaning: string;
  example: string;
  category: string;
}
