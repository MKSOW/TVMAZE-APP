const BASE_URL = 'https://api.tvmaze.com';

export const searchSeries = async (query) => {
  const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Erreur lors de la recherche');
  return res.json();
};

export const getShowDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/shows/${id}`);
  if (!res.ok) throw new Error('Erreur de récupération des détails');
  return res.json();
};

export const getSeasons = async (id) => {
  const res = await fetch(`${BASE_URL}/shows/${id}/seasons`);
  if (!res.ok) throw new Error('Erreur de récupération des saisons');
  return res.json();
};

export const getCast = async (id) => {
  const res = await fetch(`${BASE_URL}/shows/${id}/cast`);
  if (!res.ok) throw new Error('Erreur de récupération du cast');
  return res.json();
};

export const getCharacters = async (id) => {
  const res = await fetch(`${BASE_URL}/shows/${id}/characters`);
  if (!res.ok) throw new Error('Erreur de récupération des personnages');
  return res.json();
};
