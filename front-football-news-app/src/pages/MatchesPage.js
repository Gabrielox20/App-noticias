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
  { code: 'FL1', name: 'Ligue 1' },
  { code: 'BSA', name: 'Campeonato Brasileiro Série A' }
];

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(leagues[0].code);
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentMatchday, setCurrentMatchday] = useState(1);
  const [matchdays, setMatchdays] = useState([]);
  
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/results/competition/${selectedLeague}/matches`, {
          params: { year }
        });

        const groupedMatches = response.data.reduce((acc, match) => {
          acc[match.matchday] = acc[match.matchday] || [];
          acc[match.matchday].push(match);
          return acc;
        }, {});

        setMatchdays(Object.keys(groupedMatches).sort((a, b) => a - b));
        setMatches(groupedMatches);
        
        // Find the current matchday based on today's date
        const today = new Date();
        const matchday = Object.keys(groupedMatches).find(matchday => {
          const matchesInMatchday = groupedMatches[matchday];
          return matchesInMatchday.some(match => new Date(match.utcDate) >= today);
        }) || 1;

        setCurrentMatchday(matchday);
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
      <div className="matchday-selector">
        <button
          disabled={currentMatchday <= 1}
          onClick={() => setCurrentMatchday(prev => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>Matchday {currentMatchday}</span>
        <button
          disabled={currentMatchday >= matchdays.length}
          onClick={() => setCurrentMatchday(prev => Math.min(prev + 1, matchdays.length))}
        >
          Next
        </button>
      </div>
      <div className="matches-list">
        {matches[currentMatchday] && matches[currentMatchday].map((match, index) => (
          <MatchItem key={index} {...match} />
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;
