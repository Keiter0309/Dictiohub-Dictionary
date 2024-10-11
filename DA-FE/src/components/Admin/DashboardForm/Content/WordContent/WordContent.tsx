import React, { useState, useEffect } from "react";
import { Pagination, Input, Modal, Select } from "antd";
import { Search, Plus, Pencil, Trash2, ChevronUp } from "lucide-react";
import { wordData } from "../../../../../utils/Data/Data";
import { AdminWordServices } from "../../../../../services/admin/adminServices";

const WordContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [words, setWords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { TextArea } = Input;

  const fetchAllWords = async () => {
    try {
      const response = await AdminWordServices.fetchAllWords();
      setWords(response);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchAllWords();
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {wordData.map((word) => (
          <div
            key={word.id}
            className="bg-white p-5 rounded-md shadow-lg col-span-1 md:w-full transition-all duration-200 ease-in-out"
          >
            <div className="text-xl font-semibold text-gray-800 mb-10">
              <div className="flex justify-between">
                <span className="whitespace-nowrap">{word.title}</span>
                {word.icon}
              </div>
            </div>
            <p className="text-2xl text-gray-800 font-semibold">{word.value}</p>
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
              Add Word
            </h3>
            <form action="" className="flex flex-col gap-5">
              <Input placeholder="Word" name="word" />
              <TextArea rows={2} placeholder="Meaning" name="meaning" />
              <Input placeholder="Definition" name="definitionText" />
              <Input placeholder="Example" name="exampleText" />
              <Input placeholder="Synonyms" name="synonyms" inputMode="text" />
              <Input placeholder="Antonyms" name="antonyms" />
              <Input placeholder="IPA" name="ipaText" />
              <Input placeholder="Dialect" name="dialect" />
              <TextArea placeholder="Usage example" name="usageExample" />
              <Input placeholder="Audio Path" name="audioPath" />

              <Select
                placeholder="Select a Part of Speech"
                mode="multiple"
                className="w-full"
                options={[
                  { value: "noun", label: "Noun" },
                  { value: "verb", label: "Verb" },
                  { value: "adjective", label: "Adjective" },
                  { value: "adverb", label: "Adverb" },
                  { value: "pronoun", label: "Pronoun" },
                  { value: "preposition", label: "Preposition" },
                  { value: "conjunction", label: "Conjunction" },
                  { value: "interjection", label: "Interjection" },
                ]}
              />
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="p-2 rounded-md shadow-sm bg-blue-500 hover:bg-indigo-500 transition-all duration-300 text-white w-24"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      {/* User table */}
      <div className="bg-white mt-5 rounded-md shadow-md overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-5 text-left font-semibold text-gray-700 flex gap-x-2">
                Word
                <ChevronUp className="w-5 h-5 text-gray-500" />
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
                Usage Example
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
            
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-5 text-left">Ability</td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                The fact that somebody/something is able to do something.
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                The fact that somebody/something is able to do something.
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                A gentle form of exercise will increase your ability to relax.
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                capability, capacity
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                inability, incapacity
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                /əˈbɪləti/
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                American English
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                The ability to work well with others is a key skill.
              </td>
              <td className="py-3 px-5 text-left">/audio/ability.mp3</td>
              <td className="py-3 px-5 text-left">
                <button className="text-blue-500 hover:text-blue-700 transition-all duration-300">
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-700 ml-3">
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="py-3 px-5 text-left">Ability</td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                The fact that somebody/something is able to do something.
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                The fact that somebody/something is able to do something.
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                A gentle form of exercise will increase your ability to relax.
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                capability, capacity
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                inability, incapacity
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                /əˈbɪləti/
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                American English
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                The ability to work well with others is a key skill.
              </td>
              <td className="py-3 px-5 text-left">/audio/ability.mp3</td>
              <td className="py-3 px-5 text-left">
                <button className="text-blue-500 hover:text-blue-700 transition-all duration-300">
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-700 ml-3">
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="py-3 px-5 text-left">Ability</td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                The fact that somebody/something is able to do something.
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                The fact that somebody/something is able to do something.
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                A gentle form of exercise will increase your ability to relax.
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                capability, capacity
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                inability, incapacity
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                /əˈbɪləti/
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                American English
              </td>
              <td className="py-3 px-5 text-left whitespace-nowrap">
                The ability to work well with others is a key skill.
              </td>
              <td className="py-3 px-5 text-left">/audio/ability.mp3</td>
              <td className="py-3 px-5 text-left">
                <button className="text-blue-500 hover:text-blue-700 transition-all duration-300">
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-700 ml-3">
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center items-center p-5">
          <Pagination
            current={currentPage}
            total={50}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WordContent;
