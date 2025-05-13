import React, { useRef } from 'react';
import './Postit.css';
import Draggable from 'react-draggable';

const Postit = ({ id, position, content, onClose, onDragStop, onContentChange }) => {
  const nodeRef = useRef(null);

  const handleContentChange = (e) => {
    onContentChange(e.target.value);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={position}
      bounds="parent"
      handle=".postit-header"
      onStop={onDragStop}
    >
      <div ref={nodeRef} className="postit">
        <div className="postit-header">
          <span className="postit-grip">⋮⋮</span>
          <button
            className="postit-close"
            onClick={onClose}
            aria-label="Close postit"
          >
            ×
          </button>
        </div>
        <textarea
          className="postit-content"
          value={content}
          onChange={handleContentChange}
          placeholder="Type your note here..."
        />
      </div>
    </Draggable>
  );
};

export default Postit;

