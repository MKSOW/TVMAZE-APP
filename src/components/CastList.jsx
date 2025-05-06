import React from 'react';

const CastList = ({ cast }) => {
  return (
    <ul>
      {cast.map((c) => (
        <li key={c.person.id}>
          {c.person.name} dans le rôle de {c.character.name}
        </li>
      ))}
    </ul>
  );
};

export default CastList;
