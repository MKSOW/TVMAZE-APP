import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SeriePage.css';


const SeriePage = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [showRes, seasonsRes, castRes] = await Promise.all([
          fetch(`https://api.tvmaze.com/shows/${id}`),
          fetch(`https://api.tvmaze.com/shows/${id}/seasons`),
          fetch(`https://api.tvmaze.com/shows/${id}/cast`)
        ]);

        if (!showRes.ok || !seasonsRes.ok || !castRes.ok) {
          throw new Error("Erreur lors du chargement des données");
        }

        const showData = await showRes.json();
        const seasonsData = await seasonsRes.json();
        const castData = await castRes.json();

        const seasonsWithEpisodes = await Promise.all(
          seasonsData.map(async (season) => {
            const episodesRes = await fetch(`https://api.tvmaze.com/seasons/${season.id}/episodes`);
            const episodes = await episodesRes.json();
            return { ...season, episodes };
          })
        );

        setShow(showData);
        setSeasons(seasonsWithEpisodes);
        setCast(castData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (error) return <p className="error">❌ {error}</p>;
  if (!show) return <p className="loading">Chargement...</p>;

  return (
    <div className="serie-page">
      <div className="header">
        {show.image && <img src={show.image.original} alt={show.name} />}
        <div className="info">
          <h1>{show.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
          <p><strong>Langue:</strong> {show.language}</p>
          <p><strong>Genres:</strong> {show.genres.join(', ')}</p>
          <p><strong>Statut:</strong> {show.status}</p>
        </div>
      </div>

      <h2>SAISONS</h2>
      {seasons.map((season) => (
        <div key={season.id} className="season-block">
          <div className="card">
            {season.image && <img src={season.image.medium} alt={`Saison ${season.number}`} />}
            <h3>{season.name || `Saison ${season.number}`}</h3>
            <p>{season.premiereDate} - {season.endDate}</p>
            <p>{season.episodes.length} épisodes</p>
          </div>

          <div className="episode-grid">
  {season.episodes.map((episode, index) => (
    <div key={episode.id} className="card">
      {episode.image && <img src={episode.image.medium} alt={episode.name} />}
      <h4>ÉPISODE {index + 1} : {episode.name}</h4>
      <p>{episode.airdate}</p>
      <div dangerouslySetInnerHTML={{ __html: episode.summary }} />
    </div>
  ))}
</div>

        </div>
      ))}

      <h2>Cast</h2>
      <div className="card-grid">
        {cast.map((c) => (
          <div key={c.person.id} className="card">
            {c.person.image && <img src={c.person.image.medium} alt={c.person.name} />}
            <h4>{c.person.name}</h4>
            <p>Rôle : {c.character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriePage;
 