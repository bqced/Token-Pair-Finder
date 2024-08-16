// src/App.js

import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import { getTokenInfo } from './services/api';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (token1, token2, network) => {
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      console.log('Initiating search for:', token1, token2, network);
      const [info1, info2] = await Promise.all([
        getTokenInfo(token1, network).catch(e => ({ error: e.message, details: e.stack })),
        getTokenInfo(token2, network).catch(e => ({ error: e.message, details: e.stack }))
      ]);
      setResults([info1, info2]);
    } catch (error) {
      console.error('Error details:', error);
      setError(`An error occurred: ${error.message}. Please check the console for more details.`);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Token Information Finder</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading... This may take a few moments.</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && results.length > 0 && (
        <div>
          <h2>Token Information</h2>
          {results.map((token, index) => (
            <div key={index}>
              {token.error ? (
                <>
                  <p className="error">Error fetching token {index + 1}: {token.error}</p>
                  <details>
                    <summary>Error Details</summary>
                    <pre>{token.details}</pre>
                  </details>
                </>
              ) : (
                <>
                  <h3>{token.name || 'Unknown'} ({token.symbol || 'Unknown'})</h3>
                  <p>Address: {token.address}</p>
                  <p>Total Supply: {token.totalSupply || 'Unknown'}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      {!loading && !error && results.length === 0 && (
        <p>No token information found.</p>
      )}
    </div>
  );
}

export default App;