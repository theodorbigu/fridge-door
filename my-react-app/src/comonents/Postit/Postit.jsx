import React from 'react';
import './Postit.css';
import { useDrag } from 'react-dnd';

const Postit = ({ id, onClose }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'POSTIT',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`postit${isDragging ? ' postit-dragging' : ''}`}
      ref={drag}
    >
      <button
        className="postit-close"
        onClick={onClose}
        aria-label="Close postit"
      >
        ×
      </button>
      {id}
    </div>
  );
};

export default Postit;

