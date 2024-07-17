import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from '../components/NewsItem';
import LeagueSelector from '../components/LeagueSelector';
import '../styles/NewsPage.css';

const leagues = [
  { code: 'PL', name: 'Premier League' },
  { code: 'PD', name: 'LaLiga' },
  { code: 'SA', name: 'Serie A' },
  { code: 'BL1', name: 'Bundesliga' },
  { code: 'FL1', name: 'Ligue 1' }
];

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(leagues[0].name);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/news/football`, {
          params: { league: selectedLeague}
        });
        console.log(response)
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [selectedLeague]);

  return (
    <div className="news-page">
      <h1>Football News</h1>
      <LeagueSelector
        leagues={leagues}
        selectedLeague={selectedLeague}
        onChange={setSelectedLeague}
      />
      <div className="news-list">
        {articles.map((article, index) => (
          <NewsItem key={index} {...article} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
