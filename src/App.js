import React, { useState, useEffect } from 'react';
import "./App.css";

const NewsApp = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const apiKey = 'https://content.guardianapis.com/search?api-key=99d3b6ad-d4ad-48b9-b960-610c70639a1b';

  const fetchArticles = (pageNum = 1) => {
    fetch(`https://content.guardianapis.com/search?api-key=99d3b6ad-d4ad-48b9-b960-610c70639a1b`)
      .then(response => response.json())
      .then(data => {
        setArticles(data.response.results);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchArticles(prevPage);
    }
  };

  return (
    <div>
      <h1>News from The Guardian</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter topic"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {articles.map((article, index) => (
          <div key={index}>
            <a href={article.webUrl}>{article.webTitle}</a>
          </div>
        ))}
      </div>
      <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default NewsApp;


