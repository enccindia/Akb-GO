
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent"
      ></div>
      <p className="text-gray-400">Thinking...</p>
    </div>
  );
};
