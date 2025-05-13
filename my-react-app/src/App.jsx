import './App.css'
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Postit from './comonents/Postit/Postit';

function App() {
  const [postits, setPostits] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addPostit = () => {
    setPostits([...postits, { id: nextId }]);
    setNextId(nextId + 1);
  };

  const removePostit = (id) => {
    setPostits(postits.filter(p => p.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h1>Fridge Door</h1>
      <button onClick={addPostit} style={{ fontSize: '2rem', borderRadius: '50%', width: '2.5rem', height: '2.5rem', marginBottom: '1rem' }}>+</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {postits.map(postit => (
          <Postit key={postit.id} id={postit.id} onClose={() => removePostit(postit.id)} />
        ))}
      </div>
    </DndProvider>
  )
}

export default App
