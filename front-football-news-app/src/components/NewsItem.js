import React from 'react';
import '../styles/NewsItem.css';

const NewsItem = ({ title, description, url, urlToImage, publishedAt, source }) => {
  return (
    <div className="news-item">
      <h2>{title}</h2>
      <p>{description}</p>
      {urlToImage && <img src={urlToImage} alt={title} />}
      <p><a href={url} target="_blank" rel="noopener noreferrer">Read more</a></p>
      <p>Source: {source}</p>
      <p>Published at: {new Date(publishedAt).toLocaleString()}</p>
    </div>
  );
};

export default NewsItem;
