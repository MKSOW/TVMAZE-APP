import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    onSearch(query);
    setQuery(''); // <-- vide le champ après recherche
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Rechercher une série..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
};

export default SearchBar;
