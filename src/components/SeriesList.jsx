import React from 'react';
import './SeriesList.css'

const SeriesList = ({ results, onSelect }) => {
  if (!results || results.length === 0) {
    return <p>Aucune série trouvée.</p>;
  }

  return (
    <div className="series-list">
      {results.map((item) => {
        const serie = item.show || item; // compatibilité selon la structure de l'API

        // Empêche les erreurs si les données sont incomplètes
        if (!serie || !serie.name) return null;

        return (
          <div
            key={serie.id}
            className="serie-card"
            onClick={() => onSelect(serie.id)}
            style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', margin: '10px' }}
          >
            <h3>{serie.name}</h3>
            {serie.image?.medium && (
              <img src={serie.image.medium} alt={serie.name} style={{ width: '150px' }} />
            )}
            <p dangerouslySetInnerHTML={{ __html: serie.summary?.slice(0, 100) + '...' }} />
          </div>
        );
      })}
    </div>
  );
};

export default SeriesList;
