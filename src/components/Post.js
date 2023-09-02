import React from 'react';
import '../Post.css';

const Post = ({ post, favorites, setFavorites }) => {
  const isFavorite = favorites ? favorites.find(fav => fav.objectID === post.objectID) : null;

  const now = new Date();
  const createdAt = new Date(post.created_at);
  const timeElapsedMs = now.getTime() - createdAt.getTime(); 
  const timeElapsedHours = Math.floor(timeElapsedMs / (1000 * 60 * 60));

  console.log("Fecha actual:", now);
  console.log("Fecha de creación:", createdAt);
  console.log("Horas transcurridas:", timeElapsedHours);

  return (
    <div className="post-row" onClick={() => window.open(post.story_url, '_blank')}>
      <p className="time-stamp">⏰ {timeElapsedHours} hours ago</p>
      <div className="post-content">
        <h3>{post.story_title}</h3>
        <button 
          className={`favorite ${isFavorite ? 'active' : ''}`} 
          onClick={e => {
            e.stopPropagation();
            if (isFavorite) {
              setFavorites(favorites.filter(fav => fav.objectID !== post.objectID));
            } else {
              setFavorites([...favorites, post]);
            }
          }}
        ></button>
      </div>
    </div>
  );
};

export default Post;