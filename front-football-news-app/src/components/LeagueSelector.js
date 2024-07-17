import React from 'react';
import '../styles/LeagueSelector.css';

const LeagueSelector = ({ leagues, selectedLeague, onChange }) => {
  return (
    <div className="league-selector">
      <label htmlFor="league">Select League:</label>
      <select id="league" value={selectedLeague} onChange={e => onChange(e.target.value)}>
        {leagues.map(league => (
          <option key={league.code} value={league.code}>
            {league.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeagueSelector;
