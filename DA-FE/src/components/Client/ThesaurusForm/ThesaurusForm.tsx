import React, { useState } from 'react';
import { Input, Button, Card, Alert } from 'antd';
import {
  SearchOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import NavbarForm from '../NavbarForm/NavbarForm';
import { Link } from 'react-router-dom';

type WordResult = {
  word: string;
  score: number;
};

const ThesaurusForm: React.FC = () => {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState<WordResult[]>([]);
  const [antonyms, setAntonyms] = useState<WordResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWords = async () => {
    if (!word.trim()) return;

    setIsLoading(true);
    setError('');
    setSynonyms([]);
    setAntonyms([]);

    try {
      const [synonymsResponse, antonymsResponse] = await Promise.all([
        fetch(`https://api.datamuse.com/words?rel_syn=${word}`),
        fetch(`https://api.datamuse.com/words?rel_ant=${word}`),
      ]);

      const synonymsData = await synonymsResponse.json();
      const antonymsData = await antonymsResponse.json();

      setSynonyms(synonymsData);
      setAntonyms(antonymsData);

      if (synonymsData.length === 0 && antonymsData.length === 0) {
        setError('No results found for this word.');
      }
    } catch (err) {
      setError('An error occurred while fetching the data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWords();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavbarForm />

      {/* Thesaurus Content */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">Thesaurus</h1>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word"
              className="flex-grow"
            />
            <Button
              type="primary"
              htmlType="submit"
              icon={isLoading ? <LoadingOutlined /> : <SearchOutlined />}
              disabled={isLoading}
            >
              {isLoading ? 'Loading' : ''}
            </Button>
          </div>
        </form>

        {error && (
          <Alert
            message={error}
            type="error"
            className="max-w-2xl mx-auto mb-8"
          />
        )}

        {/* Results */}
        {(synonyms.length > 0 || antonyms.length > 0) && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card title="Synonyms" className="bg-white shadow-lg">
              {synonyms.length > 0 ? (
                <ul className="space-y-2">
                  {synonyms.map((syn) => (
                    <li key={syn.word} className="flex items-center">
                      <ArrowRightOutlined className="mr-2 text-blue-500" />
                      <span>{syn.word}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No synonyms found.</p>
              )}
            </Card>

            <Card title="Antonyms" className="bg-white shadow-lg">
              {antonyms.length > 0 ? (
                <ul className="space-y-2">
                  {antonyms.map((ant) => (
                    <li key={ant.word} className="flex items-center">
                      <ArrowRightOutlined className="mr-2 text-blue-500" />
                      <span>{ant.word}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No antonyms found.</p>
              )}
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
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

export default ThesaurusForm;
