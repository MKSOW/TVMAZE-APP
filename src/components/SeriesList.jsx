import React, { useState, useEffect } from 'react';
import './SeriesList.css';
import { addFavorite, removeFavorite, getFavorites } from '../utils/localStorageHelpers';

const SeriesList = ({ results, onSelect }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = (serie) => {
    const isFav = favorites.some((s) => s.id === serie.id);
    if (isFav) {
      removeFavorite(serie.id);
    } else {
      addFavorite(serie);
    }
    setFavorites(getFavorites());
  };

  if (!results || results.length === 0) {
    return <p>Aucune série trouvée.</p>;
  }

  return (
    <div className="series-list">
      {results.map((item) => {
        const serie = item.show || item;

        if (!serie || !serie.name) return null;

        const isFav = favorites.some((s) => s.id === serie.id);

        return (
          <div
            key={serie.id}
            className="serie-card"
            onClick={() => onSelect(serie.id)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
              position: 'relative',
            }}
          >
            <h3>{serie.name}</h3>
            {serie.image?.medium && (
              <img src={serie.image.medium} alt={serie.name} style={{ width: '150px' }} />
            )}
            <p dangerouslySetInnerHTML={{ __html: serie.summary?.slice(0, 100) + '...' }} />

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(serie);
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              {isFav ? '★' : '☆'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SeriesList;
