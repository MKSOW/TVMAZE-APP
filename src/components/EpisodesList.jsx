import React from 'react';
import './EpisodesList.css';

const EpisodesList = ({ episodes }) => {
  return (
    <ul>
      {episodes.map((e) => (
        <li key={e.id}>
          {e.name} (S{e.season}E{e.number}) - {e.airdate}
        </li>
      ))}
    </ul>
  );
};

export default EpisodesList;
