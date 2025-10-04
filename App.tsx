
import React, { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultsDisplay } from './components/ResultsDisplay';
import { performSearch } from './services/geminiService';
import type { SearchResult } from './types';

const App: React.FC = () => {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    setHasSearched(true);

    try {
      const result = await performSearch(query);
      setSearchResult(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 font-sans transition-all duration-500 ${hasSearched ? 'pt-8' : 'pt-20 sm:pt-40'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-8">
            <h1 className={`font-bold text-white transition-all duration-500 ${hasSearched ? 'text-4xl' : 'text-6xl md:text-8xl'}`}>
                <span className="text-blue-400">A</span>
                <span className="text-red-400">k</span>
                <span className="text-yellow-400">b</span>
                <span className="text-green-400"> GO</span>
            </h1>
        </header>

        <main>
          <div className="w-full max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          <div className="mt-12">
             <ResultsDisplay 
                result={searchResult} 
                loading={isLoading} 
                error={error} 
             />
             {!isLoading && !error && !searchResult && hasSearched && (
                <div className="text-center text-gray-400">
                    <p>No results found. Try a different search.</p>
                </div>
             )}
             {!hasSearched && (
                <div className="text-center text-gray-500 mt-16 animate-pulse">
                    <p>Your instant answer engine.</p>
                </div>
             )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
