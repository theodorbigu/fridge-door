import React, { useRef } from 'react';
import './Postit.css';
import Draggable from 'react-draggable';

const Postit = ({ id, position, onClose }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={position}
      bounds="parent"
      handle=".postit"
    >
      <div ref={nodeRef} className="postit">
        <button
          className="postit-close"
          onClick={onClose}
          aria-label="Close postit"
        >
          ×
        </button>
        {id}
      </div>
    </Draggable>
  );
};

export default Postit;

