import React, { useState } from 'react';
import Postit from '../Postit/Postit';
import './MainPage.css';

const MainPage = () => {
  const [postits, setPostits] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addPostit = () => {
    // Add new postit at a slightly offset position from center
    const centerX = window.innerWidth / 2 - 90; // half of postit width
    const centerY = window.innerHeight / 2 - 90; // half of postit height
    const offset = (nextId - 1) * 30; // offset each new postit by 30px

    setPostits([...postits, { 
      id: nextId,
      position: { 
        x: centerX + offset, 
        y: centerY + offset 
      }
    }]);
    setNextId(nextId + 1);
  };

  const removePostit = (id) => {
    setPostits(postits.filter(p => p.id !== id));
  };

  return (
    <div className="main-container">
      <div className="header-content">
        <h1 className="main-title">Fridge Door</h1>
        <p className="subtitle">Leave a message for me when you are bored</p>
        <button 
          className="add-button" 
          onClick={addPostit}
        >
          +
        </button>
      </div>
      {postits.map(postit => (
        <Postit 
          key={postit.id} 
          id={postit.id} 
          position={postit.position}
          onClose={() => removePostit(postit.id)}
        />
      ))}
    </div>
  );
};

export default MainPage;

