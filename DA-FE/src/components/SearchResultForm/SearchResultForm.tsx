import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Volume2 } from "lucide-react";
import Swal from "sweetalert2";
import { Modal } from "antd";
import { SearchResultFormProps } from "../../types/Dashboard/SearchResultFormProps";

const SearchResultForm: React.FC<SearchResultFormProps> = ({ result }) => {
  const isFavorite = localStorage.getItem("favorites");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "You must be logged in to add to favorites"
  );
  const navigate = useNavigate();

  const handleFavorite = (word: string) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      if (favorites.includes(word)) {
        setFavorites(favorites.filter((fav) => fav !== word));
        console.log(favorites);
        localStorage.removeItem("favorites");
        showSwal("Removed from favorites", "success");
      } else {
        const updatedFavorites = [...favorites, word];
          setFavorites(updatedFavorites);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          showSwal("Added to favorites", "success");
      }
    } else {
      setOpen(true);
    }
  };

  const showSwal = (message: string, icon: "success" | "error") => {
    Swal.fire({
      toast: true,
      text: message,
      icon: icon,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleOk = () => {
    setModalText("You must be logged in to add to favorites");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">{result.word}</h2>
          <div className="flex items-center">
            <button
              className="text-blue-600 hover:text-blue-800 focus:outline-none mr-4"
              aria-label="Listen to pronunciation"
            >
              <Volume2 className="h-6 w-6" />
            </button>
            <button
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
              aria-label="Bookmark word"
              onClick={() => handleFavorite(result.word)}
            >
              <Bookmark
                className={`h-6 w-6 ${
                  isFavorite ? "text-blue-600" : "text-gray-600"
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
            {result.definitionWords.map((def: any, index: number) => (
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
                <strong>Synonym:</strong> {synAnt.synonyms} /{" "}
                <strong>Antonym:</strong> {synAnt.antonyms}
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
