import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Volume, Bookmark } from "lucide-react";

const DashboardForm: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                DictioHub
              </span>
            </Link>
            <nav className="flex space-x-4">
              <Link to="/" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link
                to="/dictionary"
                className="text-gray-500 hover:text-gray-900"
              >
                Dictionary
              </Link>
              <Link
                to="/thesaurus"
                className="text-gray-500 hover:text-gray-900"
              >
                Thesaurus
              </Link>
              <Link to="/about" className="text-gray-500 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

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
              <form className="flex">
                <input
                  type="text"
                  placeholder="Search for a word"
                  className="flex-grow px-4 py-2 rounded-l-lg border-t border-b border-l text-gray-800 border-gray-200 bg-white focus:outline-none focus:ring-1 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-r-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-white">
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
                <Volume className="h-8 w-8 text-blue-600 mb-4" />
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
              © 2023 DictioHub Dictionary. All rights reserved.
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
