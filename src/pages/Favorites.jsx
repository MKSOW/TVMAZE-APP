import React, { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../utils/localStorageHelpers';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  if (favorites.length === 0) {
    return <p style={{ textAlign: 'center' }}>Aucune série en favori.</p>;
  }

  return (
    <div className="favorites-page">
      <h2>⭐ Mes séries favorites</h2>
      <div className="favorites-list">
        {favorites.map((serie) => (
          <div key={serie.id} className="favorite-card">
            <h3>{serie.name}</h3>
            {serie.image?.medium && <img src={serie.image.medium} alt={serie.name} />}
            <button onClick={() => handleRemove(serie.id)}>❌ Retirer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
