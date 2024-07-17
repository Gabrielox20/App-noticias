import React from 'react';
import '../styles/MatchItem.css';

const MatchItem = ({ homeTeam, awayTeam, utcDate, score }) => {
  return (
    <div className="match-item">
      <h2>{homeTeam.name} vs {awayTeam.name}</h2>
      <p>{new Date(utcDate).toLocaleString()}</p>
      <p>Score: {score.fullTime.home} - {score.fullTime.away}</p>
    </div>
  );
};

export default MatchItem;
