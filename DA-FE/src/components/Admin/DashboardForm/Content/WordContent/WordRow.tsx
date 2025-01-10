import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { WordRowComponentProps } from '../../../../../types/Dashboard/Contents/WordRowProps';
import { Confirm } from '../../../../../utils/ToastData/Toast';
import { AdminWordServices } from '../../../../../services/admin/adminServices';
import { message } from 'antd';

interface WordRowProps extends WordRowComponentProps {
  handleEditWord: (id: number) => void;
  fetchWord: (id: number) => void;
  fetchAllWords: (page: number) => void;
}

const WordRow: React.FC<WordRowProps> = ({
  item,
  index,
  fetchAllWords,
  handleEditWord,
}) => {
  const showConfirmSwal = async (id: number) => {
    const result = await Confirm(
      `Are you sure you want to delete the word "${item.word}"?`,
      'error',
    );

    if (result.isConfirmed) {
      handleDeleteWord(id);
    }
  };

  const handleDeleteWord = async (id: number) => {
    try {
      const response = await AdminWordServices.deleteWord(id);
      if (response.status_code === 200) {
        message.success('Word deleted successfully');
        fetchAllWords(1);
      } else {
        message.error('Failed to delete the word. Please try again.');
        console.error('Failed to delete word:', response);
      }
    } catch (error: any) {
      message.error('An error occurred while deleting the word.');
      console.error('Error deleting word:', error);
    }
  };

  const renderList = (items?: string | string[] | string[][]) => {
    if (!items) return null;
    const list = Array.isArray(items) ? items.flat() : items.split('\n');
    return list.map((item, index) => (
      <li key={index} className="list-none">
        {item}
      </li>
    ));
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-5 text-left">{index}</td>
      <td className="py-3 px-5 text-left sticky z-10 bg-white left-0">
        {item.word}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.meaningText)}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.definitionText)}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.usageExample)}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.partOfSpeech)}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.categoryNames)}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.synonyms)}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.antonyms)}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.ipa)}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.dialect)}
      </td>
      <td className="py-3 px-5 text-left whitespace-nowrap">
        {renderList(item.audioPath)}
      </td>
      <td className="py-3 px-5 text-left sticky right-0 z-10 bg-white">
        <button
          className="text-blue-500 hover:text-blue-700 transition-all duration-300"
          onClick={() => handleEditWord(item.id)}
          aria-label="Edit Word"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          className="text-red-500 hover:text-red-700 ml-3"
          onClick={() => showConfirmSwal(item.id)}
          aria-label="Delete Word"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default WordRow;
