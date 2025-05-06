// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const SerieDetails = () => {
//   const { id } = useParams();
//   const [serie, setSerie] = useState(null);
//   const [seasons, setSeasons] = useState([]);
//   const [episodesBySeason, setEpisodesBySeason] = useState({});
//   const [openSeasonId, setOpenSeasonId] = useState(null);

//   useEffect(() => {
//     const fetchSerieData = async () => {
//       try {
//         const resSerie = await axios.get(`https://api.tvmaze.com/shows/${id}`);
//         setSerie(resSerie.data);

//         const resSeasons = await axios.get(`https://api.tvmaze.com/shows/${id}/seasons`);
//         setSeasons(resSeasons.data);
//       } catch (err) {
//         console.error('Erreur lors du chargement des données :', err);
//       }
//     };

//     fetchSerieData();
//   }, [id]);

//   const handleSeasonClick = async (seasonId) => {
//     // Toggle : referme si déjà ouvert
//     setOpenSeasonId((prev) => (prev === seasonId ? null : seasonId));

//     if (!episodesBySeason[seasonId]) {
//       try {
//         const resEpisodes = await axios.get(`https://api.tvmaze.com/seasons/${seasonId}/episodes`);
//         setEpisodesBySeason((prev) => ({
//           ...prev,
//           [seasonId]: resEpisodes.data,
//         }));
//       } catch (err) {
//         console.error(`Erreur lors du chargement des épisodes pour la saison ${seasonId}:`, err);
//       }
//     }
//   };
//     console.log("Série:", serie);
//     console.log("Saisons:", seasons);

//   return (
//     <div style={{ padding: '20px' }}>
//       {serie && (
//         <>
//           <h1>{serie.name}</h1>
//           {serie.image?.medium && <img src={serie.image.medium} alt={serie.name} />}
//           <div dangerouslySetInnerHTML={{ __html: serie.summary }} />

//           <h2>Saisons</h2>
//           <ul>
//             {seasons.map((season) => (
//               <li key={season.id} style={{ marginBottom: '10px' }}>
//                 <button
//                   onClick={() => handleSeasonClick(season.id)}
//                   style={{
//                     background: 'lightblue',
//                     padding: '8px',
//                     cursor: 'pointer',
//                     border: 'none',
//                     borderRadius: '5px',
//                   }}
//                 >
//                   Saison {season.number} ({season.premiereDate} - {season.endDate || 'N/A'})
//                 </button>

//                 {openSeasonId === season.id && episodesBySeason[season.id] && (
//                   <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
//                     {episodesBySeason[season.id].map((ep) => (
//                       <li key={ep.id}>
//                         <strong>Épisode {ep.number}:</strong> {ep.name} – {ep.airdate}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default SerieDetails;
