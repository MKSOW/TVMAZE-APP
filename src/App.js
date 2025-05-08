import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SeriePage from './pages/SeriePage';
import Favorites from './pages/Favorites'; // ⬅️ importe la page des favoris
import './App.css'; // ajoute du style

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">🏠 Accueil</Link>
        <Link to="/favorites">⭐ Favoris</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/serie/:id" element={<SeriePage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
