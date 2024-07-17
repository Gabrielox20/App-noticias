import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchItem from '../components/MatchItem';
import LeagueSelector from '../components/LeagueSelector';
import '../styles/MatchesPage.css';

const leagues = [
  { code: 'PL', name: 'Premier League' },
  { code: 'PD', name: 'La Liga' },
  { code: 'SA', name: 'Serie A' },
  { code: 'BL1', name: 'Bundesliga' },
  { code: 'FL1', name: 'Ligue 1' }
];

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(leagues[0].code);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/results/competition/${selectedLeague}/matches`, {
          params: { year }
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, [selectedLeague, year]);

  return (
    <div className="matches-page">
      <h1>Match Results</h1>
      <LeagueSelector
        leagues={leagues}
        selectedLeague={selectedLeague}
        onChange={setSelectedLeague}
      />
      <div className="year-selector">
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={e => setYear(parseInt(e.target.value))}
          min="2000"
          max={new Date().getFullYear()}
        />
      </div>
      <div className="matches-list">
        {matches.map((match, index) => (
          <MatchItem key={index} {...match} />
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;
