// src/components/NetworkSelector.js

import React from 'react';

function NetworkSelector({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="ethereum">Ethereum</option>
      <option value="bsc">Binance Smart Chain</option>
      <option value="solana">Solana</option>
    </select>
  );
}

export default NetworkSelector;