import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SeriePage from './pages/SeriePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/serie/:id" element={<SeriePage />} />
      </Routes>
    </Router> 
  );
};

export default App;
