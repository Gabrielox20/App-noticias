import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsPage from './pages/NewsPage';
import MatchesPage from './pages/MatchesPage'; // Importa la nueva página
import Navbar from './components/Navbar';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/matches" element={<MatchesPage />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
