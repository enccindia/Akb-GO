import React from 'react';
import type { SearchResult } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { LinkIcon } from './Icon';

interface ResultsDisplayProps {
  result: SearchResult | null;
  loading: boolean;
  error: string | null;
}

// FIX: Renamed the component to `ResultsDisplayImpl` and removed the `export` keyword
// to avoid a naming conflict with the exported wrapper component below.
const ResultsDisplayImpl: React.FC<ResultsDisplayProps> = ({ result, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!result) {
    return null;
  }
  
  // A simple markdown-like parser for bold text (**text**)
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-blue-300">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-md">
        <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-lg">
            {renderTextWithBold(result.text)}
        </p>
      </div>

      {result.sources && result.sources.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.sources.map((source, index) => (
              <a
                key={index}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 hover:border-blue-500 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <LinkIcon className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  <div>
                    <p className="font-semibold text-blue-400 truncate group-hover:underline">{source.title}</p>
                    <p className="text-xs text-gray-500 truncate">{source.uri}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Add fade-in animation to tailwind config (or here in a style tag for simplicity in this format)
// This is not possible in this format, so using a simple keyframe animation in a component is not ideal.
// Instead, we will add a tailwind.config.js if we could, but here we will rely on a simple class.
// For the sake of this file structure, we can define the animation in a style tag in index.html,
// or just accept no animation. Let's assume a hypothetical `tailwind.config.js` with this animation.
// For now, `animate-fade-in` is a placeholder. A simple opacity transition on mount is better.
// Let's implement it with a useEffect in the component.

const FadingResultsDisplay: React.FC<ResultsDisplayProps> = (props) => {
    const [visible, setVisible] = React.useState(false);
    React.useEffect(() => {
        if(props.result || props.error) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [props.result, props.error]);

    return (
        <div className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {/* FIX: Use the renamed internal component `ResultsDisplayImpl`. */}
            <ResultsDisplayImpl {...props} />
        </div>
    )
}

// FIX: The wrapper component `FadingResultsDisplay` is now exported as `ResultsDisplay`.
// This resolves the export conflict.
export { FadingResultsDisplay as ResultsDisplay };
