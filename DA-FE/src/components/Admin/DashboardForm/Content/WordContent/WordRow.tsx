import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { WordRowComponentProps } from '../../../../../types/Dashboard/Contents/WordRowProps';
import { Confirm } from '../../../../../utils/ToastData/Toast';
import { AdminWordServices } from '../../../../../services/admin/adminServices';
import { message } from 'antd';

interface WordRowProps extends WordRowComponentProps {
  handleEditWord: (id: number) => void;
  fetchWord: (id: number) => void;
  fetchAllWords: (page:number) => void;
}

const WordRow: React.FC<WordRowProps> = ({
  item,
  index,
  fetchAllWords,
  handleEditWord,
}) => {
  const showConfirmSwal = async (id: number) => {
    const result = await Confirm(
      `Are you sure you want to delete this ${item.word}?`,
      'error',
    );

    if (result.isConfirmed) {
      handleDeleteWord(id);
    }
  };

  const handleDeleteWord = async (id: number) => {
    try {
      const response = await AdminWordServices.deleteWord(id);
      message.success('Word deleted successfully');
      fetchAllWords(1);
      if (response.status === 200) {
        return response;
      } else {
        console.error('Failed to delete word:', response);
      }
    } catch (error: any) {
      console.error('Error deleting word:', error);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-5 text-left">{index}</td>
      <td className="py-3 px-5 text-left sticky z-10 bg-white left-0">
        {item.word}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.meaningText && item.meaningText.length > 0 ? (
          <ul>
            {item.meaningText.map((meaning, index) => (
              <li key={index}>{meaning}</li>
            ))}
          </ul>
        ) : (
          ''
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
          ''
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
          ''
        )}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.partOfSpeech && item.partOfSpeech.length > 0 ? (
          <ul>
            {item.partOfSpeech.map((part, index) => (
              <li key={index}>{part}</li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.synonyms || ''}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.antonyms || ''}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.ipa || ''}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.dialect || ''}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {item.audioPath || ''}
      </td>
      <td className="py-3 px-5 text-left sticky right-0 z-10 bg-white">
        <button
          className="text-blue-500 hover:text-blue-700 transition-all duration-300"
          onClick={() => handleEditWord(item.id)}
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          className="text-red-500 hover:text-red-700 ml-3"
          onClick={() => showConfirmSwal(item.id)}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default WordRow;
