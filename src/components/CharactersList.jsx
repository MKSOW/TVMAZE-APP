import React from 'react';

const CharactersList = ({ characters }) => {
  return (
    <ul>
      {characters.map((c) => (
        <li key={c.character.id}>{c.character.name}</li>
      ))}
    </ul>
  );
};

export default CharactersList;
