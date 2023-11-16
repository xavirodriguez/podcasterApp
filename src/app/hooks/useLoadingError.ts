import { useState } from 'react';

export const useLoadingError = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadedData = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const tryAgain = () => {
    setLoading(true);
    setError(false);
  };

  return {
    loading,
    setLoading,
    error,
    handleLoadedData,
    handleError,
    tryAgain,
  };
};
