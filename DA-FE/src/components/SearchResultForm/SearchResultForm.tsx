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
      </div>
      <div className="px-6 py-4">
        <div className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Definitions
          </h3>
          <ul className="list-disc list-inside">
            {result.definitionWords.map((def: any, index: number) => (
              <li key={index} className="text-gray-800">
                {def.definitionText}
                <br />
                {def.usageExample &&(
                  <div>
                    <span className="text-gray-600">{def.usageExample} </span>
                    <span className="text-gray-600">
                      ({def.partOfSpeech})
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Examples</h3>
          <ul className="list-disc list-inside">
            {result.exampleWords.map((example: any, index: number) => (
              <li key={index} className="text-gray-800">
                {example.exampleText}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pronunciations
          </h3>
          <ul className="list-disc list-inside">
            {result.pronunciationWords.map((pron: any, index: number) => (
              <li key={index} className="text-gray-800">
                {pron.ipaText}
                {pron.dialect && <span> ({pron.dialect})</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Meanings</h3>
          <ul className="list-disc list-inside">
            {result.meaningWords.map((meaning: any, index: number) => (
              <li key={index} className="text-gray-800">
                {meaning.meaningText}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Synonyms and Antonyms
          </h3>
          <ul className="list-disc list-inside">
            {result.synonymsAntonymsWords.map((synAnt: any, index: number) => (
              <li key={index} className="text-gray-800">
                <strong>Synonym:</strong> {synAnt.synonyms} / {" "}
                <strong>Antonym:</strong> {synAnt.antonyms}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchResultForm;
