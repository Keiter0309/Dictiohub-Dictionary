import React, { useState, useEffect } from 'react';
import { Pagination, Input, Modal, Select } from 'antd';
import { Search, Plus, ChevronUp } from 'lucide-react';
import { AdminWordServices } from '../../../../../services/admin/adminServices';
import WordRow from './WordRow';
import {
  Word,
  Definition,
  ExampleWord,
  SynonymAntonym,
  Pronunciation,
  Meaning,
} from '../../../../../types/Dashboard/Contents/WordRowProps';
import { wordData } from '../../../../../utils/Data/Data';
import { WordContentProps } from '../../../../../types/Dashboard/Contents/WordContentProps';

const WordContentForm: React.FC<WordContentProps> = ({ onSubmit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAscending, setIsAscending] = useState(true);
  const [words, setWords] = useState<Word[]>([]);
  const [meaning, setMeaning] = useState<Meaning[]>([]);
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [exampleWords, setExampleWords] = useState<ExampleWord[]>([]);
  const [synonymsAntonyms, setSynonymAntonyms] = useState<SynonymAntonym[]>([]);
  const [pronunciations, setPronunciations] = useState<Pronunciation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [titleTable, setTitleTable] = useState('Add Word');
  const [word, setWord] = useState({
    word: '',
    meanings: '',
    definitionText: '',
    partOfSpeech: '',
    categoryName: '',
    exampleText: '',
    audioPath: '',
    dialect: '',
    ipaText: '',
    usageExample: '',
    synonyms: '',
    antonyms: '',
  });
  const { TextArea } = Input;

  const fetchAllWords = async () => {
    try {
      const response = await AdminWordServices.fetchAllWords();
      if (response && response.words) {
        const {
          words,
          meaning,
          definitions,
          exampleWords,
          pronunciations,
          synonymsAntonyms,
        } = response.words;
        if (
          Array.isArray(words) &&
          Array.isArray(meaning) &&
          Array.isArray(definitions) &&
          Array.isArray(exampleWords) &&
          Array.isArray(pronunciations) &&
          Array.isArray(synonymsAntonyms)
        ) {
          setWords(words);
          setMeaning(meaning);
          setDefinitions(definitions);
          setExampleWords(exampleWords);
          setSynonymAntonyms(synonymsAntonyms);
          setPronunciations(pronunciations);
        } else {
          console.error(
            'API response does not contain valid arrays:',
            response,
          );
        }
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
      (setWord({
        word: response.data.word,
        meanings: response.data.meaning[0].meaningText,
        definitionText: response.data.definitions[0].definitionText,
        partOfSpeech: response.data.definitions[0].partOfSpeech,
        categoryName: response.data.category,
        exampleText: response.data.exampleWords[0].exampleText,
        audioPath: response.data.pronunciations[0].audioPath,
        dialect: response.data.pronunciations[0].dialect,
        ipaText: response.data.pronunciations[0].ipaText,
        usageExample: response.data.definitions[0].usageExample,
        synonyms: response.data.synonyms[0].synonyms,
        antonyms: response.data.antonyms[0].antonyms,
      }));

      return response;
    } catch (error: any) {
      throw new Error(`Failed to fetch word: ${error.message}`);
    }
  };

  const combinedData = words.map((word) => {
    const meaningText = meaning
      .filter((m) => m.wordId === word.id)
      .map((m) => m.meaningText);
    const definitionText = definitions
      .filter((def) => def.wordId === word.id)
      .map((def) => def.definitionText);
    const examples = exampleWords
      .filter((ex) => ex.wordId === word.id)
      .map((ex) => ex.exampleText);
    const synonymAntonym = synonymsAntonyms.find((sa) => sa.wordId === word.id);
    const pronunciation = pronunciations.find((pr) => pr.wordId === word.id);
    return {
      ...word,
      meaningText: meaningText,
      definitionText: definitionText,
      partOfSpeech: definitions
        .filter((def) => def.wordId === word.id)
        .map((def) => def.partOfSpeech)
        .flat(),
      usageExample: examples,
      synonyms: synonymAntonym ? synonymAntonym.synonyms : '',
      antonyms: synonymAntonym ? synonymAntonym.antonyms : '',
      ipa: pronunciation ? pronunciation.ipaText : '',
      dialect: pronunciation ? pronunciation.dialect : '',
      audioPath: pronunciation ? pronunciation.audioPath : '',
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
    await onSubmit(
      word.word,
      word.meanings,
      word.definitionText,
      word.partOfSpeech[0].split(','),
      word.categoryName,
      word.exampleText,
      word.audioPath,
      word.dialect,
      word.ipaText,
      word.usageExample,
      word.synonyms,
      word.antonyms,
    );

    setWord({
      word: '',
      meanings: '',
      definitionText: '',
      partOfSpeech: '',
      categoryName: '',
      exampleText: '',
      audioPath: '',
      dialect: '',
      ipaText: '',
      usageExample: '',
      synonyms: '',
      antonyms: '',
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
      categoryName: '',
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
    fetchAllWords();
  }, []);

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
            <p className="text-2xl text-gray-800 font-semibold">{wordData.value}</p>
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
        <Modal open={showModal} onCancel={handleCloseModal} footer={null}>
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
              <TextArea
                rows={2}
                placeholder="Meaning"
                name="meaning"
                value={word.meanings}
                onChange={(e) => setWord({ ...word, meanings: e.target.value })}
              />
              <Input
                placeholder="Definition"
                name="definitionText"
                value={word.definitionText}
                onChange={(e) =>
                  setWord({ ...word, definitionText: e.target.value })
                }
              />
              <Input
                placeholder="Example"
                name="exampleText"
                value={word.exampleText}
                onChange={(e) =>
                  setWord({ ...word, exampleText: e.target.value })
                }
              />
              <Input
                placeholder="Synonyms"
                name="synonyms"
                inputMode="text"
                value={word.synonyms}
                onChange={(e) => setWord({ ...word, synonyms: e.target.value })}
              />
              <Input
                placeholder="Antonyms"
                name="antonyms"
                value={word.antonyms}
                onChange={(e) => setWord({ ...word, antonyms: e.target.value })}
              />
              <Input
                placeholder="IPA"
                name="ipaText"
                value={word.ipaText}
                onChange={(e) => setWord({ ...word, ipaText: e.target.value })}
              />
              <Input
                placeholder="Dialect"
                name="dialect"
                value={word.dialect}
                onChange={(e) => setWord({ ...word, dialect: e.target.value })}
              />
              <Input
                placeholder="Category"
                name="categoryName"
                value={word.categoryName}
                onChange={(e) =>
                  setWord({ ...word, categoryName: e.target.value })
                }
              />
              <TextArea
                placeholder="Usage example"
                name="usageExample"
                value={word.usageExample}
                onChange={(e) =>
                  setWord({ ...word, usageExample: e.target.value })
                }
              />
              <Input
                placeholder="Audio Path"
                name="audioPath"
                typeof="file"
                value={word.audioPath}
                onChange={(e) =>
                  setWord({ ...word, audioPath: e.target.value })
                }
              />

              <Select
                id="partOfSpeech"
                value={
                  Array.isArray(word.partOfSpeech)
                    ? word.partOfSpeech
                    : [word.partOfSpeech]
                }
                onChange={(value) =>
                  setWord({ ...word, partOfSpeech: value.join(', ') })
                }
                placeholder="Select a Part of Speech"
                mode="multiple"
                className="w-full"
                options={[
                  { value: 'noun', label: 'Noun' },
                  { value: 'verb', label: 'Verb' },
                  { value: 'adjective', label: 'Adjective' },
                  { value: 'adverb', label: 'Adverb' },
                  { value: 'pronoun', label: 'Pronoun' },
                  { value: 'preposition', label: 'Preposition' },
                  { value: 'conjunction', label: 'Conjunction' },
                  { value: 'interjection', label: 'Interjection' },
                ]}
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
      <div className="bg-white mt-5 rounded-md shadow-md overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                ID
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700 flex gap-x-2">
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
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
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
        {/* Pagination */}
        <div className="flex justify-center items-center p-5">
          <Pagination
            current={currentPage}
            total={words.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WordContentForm;
