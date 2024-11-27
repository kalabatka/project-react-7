import React, { useState, useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';




const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    fetch(`https://content.guardianapis.com/search?api-key=99d3b6ad-d4ad-48b9-b960-610c70639a1b/search?api-key=API_KEY&page=${page}`)
      .then(response => response.json())
      .then(data => setArticles(data.response.results));
  }, [page]);

  return (
    <div>
      {articles.map((article, index) => (
        <div key={index}>
          <a href={article.webUrl}>{article.webTitle}</a>
        </div>
      ))}
      <Pagination currentPage={page} />
    </div>
  );
};

const Pagination = ({ currentPage }) => {
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    navigate(`/news?page=${newPage}`);
  };

  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/news" element={<NewsPage />} />
    </Routes>
  </Router>
);

export default App;





