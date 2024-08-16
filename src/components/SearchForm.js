// src/components/SearchForm.js

import React, { useState } from 'react';
import NetworkSelector from './NetworkSelector';

function SearchForm({ onSearch }) {
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
  const [network, setNetwork] = useState('ethereum');

  const validateInput = (input, network) => {
    if (network === 'solana') {
      return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(input);
    }
    return /^0x[a-fA-F0-9]{40}$/.test(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(token1, network) && validateInput(token2, network)) {
      onSearch(token1, token2, network);
    } else {
      alert('Please enter valid contract addresses for the selected network.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={token1}
        onChange={(e) => setToken1(e.target.value)}
        placeholder={`Token 1 Contract Address (${network})`}
      />
      <input
        type="text"
        value={token2}
        onChange={(e) => setToken2(e.target.value)}
        placeholder={`Token 2 Contract Address (${network})`}
      />
      <NetworkSelector value={network} onChange={setNetwork} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;