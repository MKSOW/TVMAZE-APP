import React from 'react';
import './SeasonsList.css';

const SeasonsList = ({ seasons }) => {
  return (
    <ul>
      {seasons.map((s) => (
        <li key={s.id}>
          Saison {s.number} : {s.premiereDate} à {s.endDate} ({s.episodeOrder || '?'} épisodes)
        </li>
      ))}
    </ul>
  );
};

export default SeasonsList;
