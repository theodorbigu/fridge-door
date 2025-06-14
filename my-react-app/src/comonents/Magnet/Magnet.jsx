import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import './Magnet.css';

// Import all magnet images
import magnet1 from '../../assets/magnets/magnet-1.png';
import magnet2 from '../../assets/magnets/magnet-2.png';
import magnet3 from '../../assets/magnets/magnet-3.png';
import magnet4 from '../../assets/magnets/magnet-4.png';

const magnetImages = {
  1: magnet1,
  2: magnet2,
  3: magnet3,
  4: magnet4
};

const Magnet = ({ id, position, onDragStop }) => {
  const nodeRef = useRef(null);

  console.log(id);

  // Calculate the scale based on size prop (0-100)

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={position}
      bounds="parent"
      onStop={onDragStop}
    >
      <div 
        ref={nodeRef} 
        className="magnet"
      >
        <img 
          src={magnetImages[id]} 
          alt={`Magnet ${id}`} 
          draggable="false"
        />
      </div>
    </Draggable>
  );
};

export default Magnet; 