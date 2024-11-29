import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Volume2 } from 'lucide-react';
import { Modal, message } from 'antd';
import { SearchResultFormProps } from '../../../types/Dashboard/SearchResultFormProps';
import wordServices from '../../../services/word/wordServices';
import { AUTH_CLIENT_HOST } from '../../../enums/Auth/EAuth';

const SearchResultForm: React.FC<SearchResultFormProps> = ({ result }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'You must be logged in to add to favorites',
  );
  const [searchResults, setSearchResults] = useState(result);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    setSearchResults(result);
  }, [result]);

  const handleFavorite = async (word: string) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    const wordId = localStorage.getItem('ord');
    if (token) {
      if (favorites.includes(word)) {
        const updatedFavorites = favorites.filter((fav) => fav !== word);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        try {
          await wordServices.removeFavoriteWord(Number(wordId), Number(userId));
          localStorage.removeItem('ord');
        } catch (err: any) {
          console.error(err);
        }
        message.success('Removed from favorites');
      } else {
        const updatedFavorites = [...favorites, word];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        message.success('Added to favorites');
        try {
          await wordServices.addFavoriteWord(Number(wordId), Number(userId));
          localStorage.removeItem('ord');
        } catch (err: any) {
          console.error(err);
        }

        // Save to params
        const params = new URLSearchParams();
        params.append('word', word);
      }
    } else {
      setOpen(true);
    }
  };

  const handleOk = () => {
    setModalText('You must be logged in to add to favorites');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            {searchResults.word}
          </h2>
          <div className="flex items-center">
            {searchResults.pronunciations.map((pron: any, index: number) => {
              const audioSrc = `${AUTH_CLIENT_HOST}/api/v1/audio/${pron.audioPath}`;

              // reload audio when word changes
              const audio = new Audio(audioSrc);
              audio.load();
              return (
                <button
                  key={index}
                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  aria-label="Play pronunciation"
                  onClick={() => audio.play()}
                >
                  <Volume2 className="h-6 w-6" />
                </button>
              );
            })}
            <button
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
              aria-label="Bookmark word"
              onClick={() => handleFavorite(searchResults.word)}
            >
              <Bookmark
                className={`h-6 w-6 ${
                  favorites.includes(searchResults.word)
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Definitions
          </h3>
          <ul className="list-disc list-inside">
            {searchResults.definitions.map((def: any, index: number) => (
              <li key={index} className="text-gray-800">
                {def.definitionText}
                <br />
                {def.usageExample && (
                  <div>
                    <span className="text-gray-600">{def.usageExample} </span>
                    <span className="text-gray-600">({def.partOfSpeech})</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Examples</h3>
          <ul className="list-disc list-inside">
            {searchResults.exampleWords.map((example: any, index: number) => (
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
            {searchResults.pronunciations.map((pron: any, index: number) => (
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
            {searchResults.meanings.map((meaning: any, index: number) => (
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
            {searchResults.synonyms.map((syn: any, index: number) => (
              <li key={index} className="text-gray-800">
                <strong>Synonym:</strong> {syn.synonyms} /{' '}
              </li>
            ))}
            {searchResults.antonyms.map((ant: any, index: number) => (
              <li key={index} className="text-gray-800">
                <strong>Antonym:</strong> {ant.antonyms}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="">
        <Modal
          className=""
          title="Login Required"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => setOpen(false)}
        >
          <p>{modalText}</p>
        </Modal>
      </div>
    </div>
  );
};

export default SearchResultForm;
