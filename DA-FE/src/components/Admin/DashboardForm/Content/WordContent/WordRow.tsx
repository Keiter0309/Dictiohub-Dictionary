import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { WordRowComponentProps } from "../../../../../types/Dashboard/Contents/WordRowProps";

const WordRow: React.FC<WordRowComponentProps> = ({ item, index }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-5 text-left">{index}</td>
      <td className="py-3 px-5 text-left">{item.word}</td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.meaningText && item.meaningText.length > 0 ? (
            <ul>
               {item.meaningText.map((meaning, index)=> (
                     <li key={index}>{meaning}</li>
               ))} 
            </ul>
        ):(
            ""
        )}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.definitionText && item.definitionText.length > 0 ? (
          <ul>
            {item.definitionText.map((definition, index) => (
              <li key={index}>{definition}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.usageExample && item.usageExample.length > 0 ? (
          <ul>
            {item.usageExample.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.synonyms || ""}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.antonyms || ""}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.ipa || ""}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.dialect || ""}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.audioPath || ""}
      </td>
      <td className="py-3 px-5 text-left">
        <button className="text-blue-500 hover:text-blue-700 transition-all duration-300">
          <Pencil className="w-5 h-5" />
        </button>
        <button className="text-red-500 hover:text-red-700 ml-3">
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default WordRow;
