
import React, { useState } from 'react';
import { SearchIcon } from './Icon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full shadow-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask anything..."
        className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none px-4 py-2"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !query}
        className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
      >
        <SearchIcon className="h-6 w-6" />
      </button>
    </form>
  );
};
