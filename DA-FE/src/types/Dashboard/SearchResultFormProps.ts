export interface SearchResultFormProps {
  result: {
    word: string;
    definition: string;
    example: string;
    pronunciation: string;
    meaning: string;
    dialect: string;
    definitionWords: {
      definitionText: string;
      usageExample: string;
      partOfSpeech: string;
    }[];
    exampleWords: {
      exampleText: string;
    }[];
    pronunciationWords: {
      ipaText: string;
      dialect: string;
    }[];
    synonymsAntonymsWords: {
      synonyms: string;
      antonyms: string;
    }[];
    meaningWords: {
      meaningText: string;
    }[];
  };
}
