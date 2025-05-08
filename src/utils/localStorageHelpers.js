// Historique de recherche
export const saveSearchHistory = (query) => {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history = history.filter((item) => item.toLowerCase() !== query.toLowerCase());
    history.unshift(query);
    history = history.slice(0, 5); 
    localStorage.setItem('searchHistory', JSON.stringify(history));
  };
  
  export const getSearchHistory = () => {
    return JSON.parse(localStorage.getItem('searchHistory')) || [];
  };
  
  export const clearSearchHistory = () => {
    localStorage.removeItem('searchHistory');
  };
  
  
  // Favoris
  export const addFavorite = (serie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updated = [...favorites.filter((s) => s.id !== serie.id), serie];
    localStorage.setItem('favorites', JSON.stringify(updated));
  };
  
  export const removeFavorite = (serieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updated = favorites.filter((s) => s.id !== serieId);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };
  
  export const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  };
  