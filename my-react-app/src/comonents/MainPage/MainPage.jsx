import React, { useState } from 'react';
import Postit from '../Postit/Postit';
import Magnet from '../Magnet/Magnet';
import './MainPage.css';

const MainPage = () => {
  const [postits, setPostits] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Initial positions and sizes for the three magnets
  const magnets = [
    { id: 1, position: { x: 50, y: 50 } },
    { id: 2, position: { x: window.innerWidth - 150, y: 50 } },
    { id: 3, position: { x: window.innerWidth / 2 - 50, y: window.innerHeight - 150 } }
  ];

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
          Add Postit
        </button>
      </div>
      {/* Render magnets */}
      {magnets.map(magnet => (
        <Magnet
          key={magnet.id}
          id={magnet.id}
          position={magnet.position}
        />
      ))}
      {/* Render postits */}
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

