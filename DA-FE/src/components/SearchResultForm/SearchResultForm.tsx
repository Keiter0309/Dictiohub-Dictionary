import React from "react";
import { Volume2 } from "lucide-react";
import { SearchResultFormProps } from "../../types/Dashboard/SearchResultFormProps";

const SearchResultForm: React.FC<SearchResultFormProps> = ({ result }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">{result.word}</h2>
          <button
            className="text-blue-600 hover:text-blue-800 focus:outline-none"
            aria-label="Listen to pronunciation"
          >
            <Volume2 className="h-6 w-6" />
          </button>
        </div>
        <p className="text-gray-600 mt-1">Definition: {result.definition}</p>
      </div>
      <div className="px-6 py-4">
        <div className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {result.example}
          </h3>
          <p className="text-gray-800 mb-2">Example sentence using the word.</p>
          <p className="text-gray-600 italic">Additional example or note.</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pronunciation
          </h3>
          <p className="text-gray-800"><code>{result.pronunciation}</code></p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Part of Speech
          </h3>
          <p className="text-gray-800">{result.partOfSpeech}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Meaning</h3>
          <p className="text-gray-900">{result.meaning}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Synonyms</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              Synonym 1
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              Synonym 2
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              Synonym 3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultForm;
