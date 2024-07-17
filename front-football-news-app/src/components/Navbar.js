import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/matches">Resultados</Link></li>
        <li><Link to="/">Noticias</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
