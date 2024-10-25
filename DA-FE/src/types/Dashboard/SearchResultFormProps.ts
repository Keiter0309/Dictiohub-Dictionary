export interface SearchResultFormProps {
  result: {
    word: string;
    definition: string;
    example: string;
    pronunciation: string;
    meaning: string;
    dialect: string;
    definitions: {
      definitionText: string;
      usageExample: string;
      partOfSpeech: string;
    }[];
    exampleWords: {
      exampleText: string;
    }[];
    pronunciations: {
      ipaText: string;
      dialect: string;
    }[];
    synonyms: {
      synonyms: string;
    }[];
    antonyms: {
      antonyms: string;
    }[];
    meanings: {
      meaningText: string;
    }[];
  };
}
