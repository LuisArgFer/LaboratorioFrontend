import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post'; // Asegúrate de tener este componente importado

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("all");
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchData = () => {
    let url = `https://hn.algolia.com/api/v1/search_by_date?page=${page}`;
    if (filter !== "all") {
      url += `&query=${filter}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => setPosts(data.hits.filter(post => post.author && post.story_title && post.story_url && post.created_at)));
  };

  useEffect(() => {
    if (!showFavorites) {
      fetchData();
    }
  }, [page, filter, showFavorites]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="App">
      <h1 className="title">Hacker News Posts</h1>
      <div className="controls">
        <select className="filter-dropdown" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="vue">Vue</option>
          <option value="react">React</option>
          <option value="angular">Angular</option>
        </select>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Show All Posts' : 'Show Favorites'}
        </button>
      </div>
      <div className="posts-container">
        {(showFavorites ? favorites : posts).map(post => (
          <Post key={post.objectID} post={post} favorites={favorites} setFavorites={setFavorites} />
        ))}
      </div>
      {!showFavorites && (
        <div className="pagination">
          <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 0))}>
            &#8592;
          </button>
          {[...Array(10)].map((_, i) => (
            <span 
              key={i} 
              className={`page-number ${i === page ? 'active' : ''}`} 
              onClick={() => setPage(i)}
            >
              {i + 1}
            </span>
          ))}
          <button onClick={() => setPage(prevPage => prevPage + 1)}>
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default App;