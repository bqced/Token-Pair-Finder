// src/components/ResultsTable.js

import React from 'react';

function ResultsTable({ results, token1Address, token2Address }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Wallet Address</th>
          <th>Token 1 First Appearance</th>
          <th>Token 2 First Appearance</th>
          <th>Both Tokens First Appeared</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => {
          const token1Date = new Date(result.tokens[token1Address].firstAppearance);
          const token2Date = new Date(result.tokens[token2Address].firstAppearance);
          const bothTokensDate = new Date(Math.max(token1Date, token2Date));
          
          return (
            <tr key={result.address}>
              <td>{result.address}</td>
              <td>{token1Date.toLocaleString()}</td>
              <td>{token2Date.toLocaleString()}</td>
              <td>{bothTokensDate.toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ResultsTable;