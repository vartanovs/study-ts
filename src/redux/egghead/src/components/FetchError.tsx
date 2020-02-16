import React from 'react';

interface FetchErrorProps {
  message: string;
  onRetry: () => void;
}

const FetchError: React.FC<FetchErrorProps> = ({ message, onRetry }: FetchErrorProps) => (
  <div>
    <p>Could not fetch todos. {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

export default FetchError;
