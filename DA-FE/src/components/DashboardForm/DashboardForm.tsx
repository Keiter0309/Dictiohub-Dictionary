import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Volume2, Bookmark } from "lucide-react";
import { DashboardFormProps } from "../../types/Dashboard/DashboardFormProps";
import wordServices from "../../services/word/wordServices";
import NavbarForm from "../NavbarForm/NavbarForm";
import SearchResultForm from "../SearchResultForm/SearchResultForm";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Select } from "antd";
import Fuse from "fuse.js";

const { Option } = Select;

const DashboardForm: React.FC<DashboardFormProps> = ({
  onSubmit,
  searchResult,
}) => {
  const [word, setWord] = useState("");
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(word);
  };

  const handleSelectChange = (value: string) => {
    setWord(value);
  };

  const fuse = new Fuse(options, {
    keys: ["label"],
    includeScore: true,
  });

  const handleInputChange = async (inputValue: string) => {
    if (!inputValue) {
      setFilteredOptions([]);
    } else {
      try {
        const response = await wordServices.getAllWords();
        const newOptions = response.map((result: any) => ({
          value: result.word,
          label: result.word,
        }));
        setOptions(newOptions);
        const result = fuse.search(inputValue);
        setFilteredOptions(result.map(({ item }) => item));
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Components */}
      <NavbarForm />

      <main className="flex-grow">
        <section className="bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              Explore the World of Words
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover definitions, synonyms, and more with DictioHub Dictionary
            </p>
            <div className="max-w-xl mx-auto">
              <form
                className="flex flex-row items-center"
                onSubmit={handleSubmit}
              >
                <Select
                  showSearch
                  value={word}
                  onChange={handleSelectChange}
                  onSearch={handleInputChange}
                  placeholder="Search for a word"
                  filterOption={false}
                  className="flex-grow"
                >
                  {filteredOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
                <div className="flex items-center align-middle">
                  <Tooltip title="search">
                    <Button
                      htmlType="submit"
                      className="ml-2"
                      type="primary"
                      shape="circle"
                      icon={<SearchOutlined />}
                    />
                  </Tooltip>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Search Result Components */}
        <section className="py-12 sm:py-16 lg:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {searchResult && <SearchResultForm result={searchResult} />}
          </div>
        </section>

        <section className="py-8 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Search className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Comprehensive Definitions
                </h3>
                <p className="text-gray-600">
                  Access detailed definitions for millions of words in multiple
                  languages.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Volume2 className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Audio Pronunciations
                </h3>
                <p className="text-gray-600">
                  Listen to correct pronunciations to improve your speaking
                  skills.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Bookmark className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Personal Word Lists
                </h3>
                <p className="text-gray-600">
                  Create and manage your own word lists for efficient learning
                  and review.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 DictioHub Dictionary. All rights reserved.
            </p>
            <nav className="flex space-x-4 mt-4 sm:mt-0">
              <Link
                to="/terms"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardForm;