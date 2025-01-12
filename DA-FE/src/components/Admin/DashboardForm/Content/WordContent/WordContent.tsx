import React, { useState, useEffect } from 'react';
import { Pagination, Input, Modal, message, Select, Spin } from 'antd';
import { Search, Plus, ChevronUp } from 'lucide-react';
import {
  AdminCategoryService,
  AdminWordServices,
} from '../../../../../services/admin/adminServices';
import WordRow from './WordRow';
import {
  Word,
  Definition,
  ExampleWord,
  SynonymAntonym,
  Pronunciation,
  Meaning,
  WordCategory,
} from '../../../../../types/Dashboard/Contents/WordRowProps';
import { wordData } from '../../../../../utils/Data/Data';
import { WordContentProps } from '../../../../../types/Dashboard/Contents/WordContentProps';
import { ICategoriesContentProps } from '../../../../../types/Dashboard/Contents/CategoriesContentProps';

const WordContentForm: React.FC<WordContentProps> = ({ onSubmit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAscending, setIsAscending] = useState(true);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [titleTable, setTitleTable] = useState('Add Word');
  const [categories, setCategories] = useState<ICategoriesContentProps[]>([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [word, setWord] = useState({
    word: '',
    meanings: '',
    definitionText: '',
    partOfSpeech: '',
    categoryNames: [] as string[],
    exampleText: '',
    audioPath: '',
    dialect: '',
    ipaText: '',
    usageExample: '',
    synonyms: '',
    antonyms: '',
  });
  const { TextArea } = Input;

  const fetchAllWords = async (page: number) => {
    try {
      const response = await AdminWordServices.fetchAllWords(page, 10);
      if (response) {
        setData(response.data);
        setTotalPages(response.meta.totalItems);
      } else {
        console.error(
          'API response does not contain a valid words object:',
          response,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWord = async (id: number) => {
    try {
      const response = await AdminWordServices.fetchWord(id);
      const data = response.data;

      setWord({
        word: data.word,
        meanings:
          data.meanings
            ?.map((meaning: any) => meaning.meaningText)
            .join('\n') || '',
        definitionText:
          data.definitions
            ?.map((definition: any) => definition.definitionText)
            .join('\n') || '',
        partOfSpeech:
          data.definitions
            ?.map((definition: any) => definition.partOfSpeech)
            .join('\n') || '',
        categoryNames:
          data.category?.map((category: any) => category.categoryName) || [],
        exampleText:
          data.exampleWords
            ?.map((example: any) => example.exampleText)
            .join('\n') || '',
        audioPath:
          data.pronunciations
            ?.map((pronunciation: any) => pronunciation.audioPath)
            .join('\n') || '',
        dialect:
          data.pronunciations
            ?.map((pronunciation: any) => pronunciation.dialect)
            .join('\n') || '',
        ipaText:
          data.pronunciations
            ?.map((pronunciation: any) => pronunciation.ipaText)
            .join('\n') || '',
        usageExample:
          data.definitions
            ?.map((definition: any) => definition.usageExample)
            .join('\n') || '',
        synonyms:
          data.synonyms?.map((synonym: any) => synonym.synonyms).join('\n') ||
          '',
        antonyms:
          data.antonyms?.map((antonym: any) => antonym.antonyms).join('\n') ||
          '',
      });

      setSelectedCategory(
        data.category?.map((category: any) => category),
      );

      return response;
    } catch (error: any) {
      throw new Error(`Failed to fetch word: ${error.message}`);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await AdminCategoryService.fetchAllCategories();
      if (response) {
        setCategories(response.categories);
        return response.categories;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const combinedData = data.map((word: Word) => {
    const meaningText: string[] = word.meanings.map(
      (mean: Meaning) => mean.meaningText,
    );
    const definitionText: string[] = word.definitions.map(
      (def: Definition) => def.definitionText,
    );
    const examples: string[] = word.exampleWords.map(
      (ex: ExampleWord) => ex.exampleText,
    );
    const synonyms: string[] = word.synonymsAntonyms.map(
      (sa: SynonymAntonym) => sa.synonyms,
    );
    const antonyms: string[] = word.synonymsAntonyms.map(
      (sa: SynonymAntonym) => sa.antonyms,
    );
    const dialect: string[] = word.pronunciations.map(
      (pr: Pronunciation) => pr.dialect,
    );
    const ipa: string[] = word.pronunciations.map(
      (pr: Pronunciation) => pr.ipaText,
    );
    const audioPath: string[] = word.pronunciations.map(
      (pr: Pronunciation) => pr.audioPath,
    );
    const wordCategories: string[] = word.wordCategories.map(
      (wc: WordCategory) => wc.categoryName,
    );

    return {
      ...word,
      meaningText: meaningText,
      definitionText: definitionText,
      partOfSpeech: word.definitions.map((def: Definition) => def.partOfSpeech),
      usageExample: examples,
      synonyms: synonyms,
      antonyms: antonyms,
      ipa: ipa,
      dialect: dialect,
      audioPath: audioPath,
      categoryNames: wordCategories,
    };
  });

  const handleSortWords = () => {
    const sortedWords = [...words].sort((a, b) => {
      if (isAscending) {
        return a.word.localeCompare(b.word);
      } else {
        return b.word.localeCompare(a.word);
      }
    });
    setWords(sortedWords);
    setIsAscending(!isAscending);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowModal(false);
    setLoading(true);
    await onSubmit(
      word.word,
      word.meanings,
      word.definitionText,
      word.partOfSpeech,
      selectedCategory,
      word.exampleText,
      word.dialect,
      word.ipaText,
      word.usageExample,
      word.synonyms,
      word.antonyms,
    );
    setLoading(false);

    setWord({
      word: '',
      meanings: '',
      definitionText: '',
      partOfSpeech: '',
      categoryNames: [],
      exampleText: '',
      audioPath: '',
      dialect: '',
      ipaText: '',
      usageExample: '',
      synonyms: '',
      antonyms: '',
    });
    message.success('Word added successfully');
    handleCloseModal();
    fetchAllWords(currentPage);
    setSelectedCategory([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchAllWords(page);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWord({
      word: '',
      meanings: '',
      definitionText: '',
      partOfSpeech: '',
      categoryNames: [],
      exampleText: '',
      audioPath: '',
      dialect: '',
      ipaText: '',
      usageExample: '',
      synonyms: '',
      antonyms: '',
    });

    setTitleTable('Add Word');
  };

  const handleEditWord = async (id: number) => {
    await fetchWord(id);
    setShowModal(true);
    setTitleTable('Edit Word');
  };

  useEffect(() => {
    fetchAllWords(currentPage);
    fetchAllCategories();
  }, [currentPage]);

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {wordData.map((wordData) => (
          <div
            key={wordData.id}
            className="bg-white p-5 rounded-md shadow-lg col-span-1 md:w-full transition-all duration-200 ease-in-out"
          >
            <div className="text-xl font-semibold text-gray-800 mb-10">
              <div className="flex justify-between">
                <span className="whitespace-nowrap">{wordData.title}</span>
                {wordData.icon}
              </div>
            </div>
            <p className="text-2xl text-gray-800 font-semibold">
              {wordData.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search word && add word */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search words..."
            className="shadow-md px-2 py-2 pl-10 rounded-md border w-full md:w-64"
          />
          <Search className="absolute left-2 top-2 text-gray-500 w-6 h-6" />
        </div>
        <button
          onClick={handleShowModal}
          className="bg-blue-500 hover:bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center transition-all duration-200 ease-linear w-full md:w-auto"
        >
          <Plus className="mr-2 w-5 h-5" />
          Add Word
        </button>
        <Modal
          open={showModal}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
        >
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              {titleTable}
            </h3>
            <form
              action=""
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <Input
                placeholder="Word"
                name="word"
                value={word.word}
                onChange={(e) => setWord({ ...word, word: e.target.value })}
              />
              <Input
                placeholder="Meaning"
                name="meanings"
                value={word.meanings}
                onChange={(e) => setWord({ ...word, meanings: e.target.value })}
              />
              <TextArea
                rows={3}
                placeholder="Definition"
                name="definitionText"
                value={word.definitionText}
                onChange={(e) =>
                  setWord({ ...word, definitionText: e.target.value })
                }
              />
              <TextArea
                rows={3}
                placeholder="Example"
                name="exampleText"
                value={word.exampleText}
                onChange={(e) =>
                  setWord({ ...word, exampleText: e.target.value })
                }
              />
              <TextArea
                rows={3}
                placeholder="Synonyms"
                name="synonyms"
                inputMode="text"
                value={word.synonyms}
                onChange={(e) => setWord({ ...word, synonyms: e.target.value })}
              />
              <TextArea
                rows={3}
                placeholder="Antonyms"
                name="antonyms"
                value={word.antonyms}
                onChange={(e) => setWord({ ...word, antonyms: e.target.value })}
              />
              <TextArea
                rows={3}
                placeholder="IPA"
                name="ipaText"
                value={word.ipaText}
                onChange={(e) => setWord({ ...word, ipaText: e.target.value })}
              />
              <TextArea
                rows={3}
                placeholder="Dialect"
                name="dialect"
                value={word.dialect}
                onChange={(e) => setWord({ ...word, dialect: e.target.value })}
              />
              <Input
                placeholder="Category"
                name="categoryNames"
                type="hidden"
                value={[selectedCategory.join(', ')]}
              />
              <Select
                placeholder="Select a Category"
                className="w-full"
                mode="multiple"
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
              >
                {categories.map((category) => {
                  return (
                    <Select.Option
                      key={category.id}
                      value={category.categoryName}
                    >
                      {category.categoryName}
                    </Select.Option>
                  );
                })}
              </Select>
              <TextArea
                placeholder="Usage example"
                name="usageExample"
                value={word.usageExample}
                onChange={(e) =>
                  setWord({ ...word, usageExample: e.target.value })
                }
              />
              <TextArea
                rows={3}
                placeholder="Part of Speech"
                inputMode="text"
                name="partOfSpeech"
                value={word.partOfSpeech}
                onChange={(value) =>
                  setWord({ ...word, partOfSpeech: value.target.value })
                }
              />
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="p-2 rounded-md shadow-sm bg-blue-500 hover:bg-indigo-500 transition-all duration-300 text-white w-24"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      {/* Word table */}
      <div className="bg-white mt-5 rounded-md shadow-md overflow-x-auto relative">
        <div className="relative">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr className="border-b border-gray-200">
                <th className="py-3 px-5 text-left font-semibold text-gray-700 z-10 sticky left-0 bg-gray-100">
                  ID
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700 flex gap-x-2 z-10 sticky left-0 bg-gray-100">
                  Word
                  <button onClick={handleSortWords}>
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  </button>
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  Meaning
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  Definition
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  Example
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  Part Of Speech
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  Categories
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  Synonyms
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  Antonyms
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  IPA
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  Dialect
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700">
                  Audio Path
                </th>
                <th className="py-3 px-5 text-left font-semibold text-gray-700 sticky right-0 z-10 bg-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map((item, index) => (
                <WordRow
                  key={`${item.id}-${index}`}
                  item={item}
                  index={index + 1}
                  fetchAllWords={fetchAllWords}
                  handleEditWord={handleEditWord}
                  fetchWord={fetchWord}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center p-5">
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
      {/* Loader antd */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default WordContentForm;
