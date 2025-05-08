import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SeriesList from '../components/SeriesList';
import { searchSeries } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { saveSearchHistory, getSearchHistory, clearSearchHistory } from '../utils/localStorageHelpers';


import './Home.css';


const Home = () => {
  const [results, setResults] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Chargement initial des séries
  useEffect(() => {
    const fetchAllSeries = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/shows');
        const data = await response.json();
        setAllSeries(data);
      } catch (error) {
        console.error('Erreur lors du chargement des séries :', error);
      }
    };

    fetchAllSeries();
  }, []);

  const [history, setHistory] = useState([]);

  const handleClearHistory = () => {
    clearSearchHistory();
    setHistory([]);
  };
  

  useEffect(() => {
    setHistory(getSearchHistory());
  }, [results]);

  // Gestion de la recherche
  const handleSearch = async (query) => {
    if (!query) {
      setIsSearching(false);
      setResults([]);
      return;
    }

    try {
      // Enregistrer l'historique de recherche dans le localStorage
      saveSearchHistory(query);
      const data = await searchSeries(query);
      setResults(data);
      setIsSearching(true);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  const handleSelect = (id) => {
    navigate(`/serie/${id}`);
  };
  

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isSearching ? results : allSeries.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = isSearching
    ? Math.ceil(results.length / itemsPerPage)
    : Math.ceil(allSeries.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="home">
      <h1>Recherche de séries TV</h1>
      <SearchBar onSearch={handleSearch} />
  
      {/* Historique des recherches */}
      <div className="search-history">
  <div className="history-header">
    <h2>Recherches récentes</h2>
    {history.length > 0 && (
      <button onClick={handleClearHistory} className="clear-btn">Effacer</button>
    )}
  </div>
  <ul>
    {history.map((item, index) => (
      <li key={index} onClick={() => handleSearch(item)}>
        {item}
      </li>
    ))}
  </ul>
</div>

  
      <SeriesList results={currentItems} onSelect={handleSelect} />
  
      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>Page {currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
  
};

export default Home;
