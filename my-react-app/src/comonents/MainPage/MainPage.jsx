import React, { useState, useEffect } from 'react';
import Postit from '../Postit/Postit';
import Magnet from '../Magnet/Magnet';
import { supabase } from '../../lib/supabase';
import {
  loadMagnets,
  loadPostits,
  addPostit as dbAddPostit,
  updateMagnetPosition as dbUpdateMagnetPosition,
  updatePostitPosition as dbUpdatePostitPosition,
  updatePostitContent as dbUpdatePostitContent,
  removePostit as dbRemovePostit
} from '../../lib/supabaseActions';
import './MainPage.css';

const MainPage = () => {
  const [postits, setPostits] = useState([]);
  const [magnets, setMagnets] = useState([]);

  // Load initial data
  useEffect(() => {
    const initializeData = async () => {
      const loadedMagnets = await loadMagnets(magnets);
      if (loadedMagnets) {
        setMagnets(loadedMagnets);
      }

      const loadedPostits = await loadPostits();
      if (loadedPostits) {
        setPostits(loadedPostits);
      }
    };

    initializeData();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const magnetsSubscription = supabase
      .channel('magnets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'magnets' }, 
        async () => {
          const loadedMagnets = await loadMagnets(magnets);
          if (loadedMagnets) setMagnets(loadedMagnets);
        }
      )
      .subscribe();

    const postitsSubscription = supabase
      .channel('postits')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'postits' }, 
        async () => {
          const loadedPostits = await loadPostits();
          if (loadedPostits) setPostits(loadedPostits);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(magnetsSubscription);
      supabase.removeChannel(postitsSubscription);
    };
  }, [magnets]);

  const addPostitHandler = async () => {
    const centerX = window.innerWidth / 2 - 90;
    const centerY = window.innerHeight / 2 - 90;
    const offset = postits.length * 30;

    const position = { 
      x: centerX + offset, 
      y: centerY + offset 
    };

    const newPostit = await dbAddPostit(position);
    if (newPostit) {
      setPostits([...postits, newPostit]);
    }
  };

  const updateMagnetPositionHandler = async (id, position) => {
    const success = await dbUpdateMagnetPosition(id, position);
    if (success) {
      setMagnets(magnets.map(m => 
        m.id === id ? { ...m, position } : m
      ));
    }
  };

  const updatePostitPositionHandler = async (id, position) => {
    const success = await dbUpdatePostitPosition(id, position);
    if (success) {
      setPostits(postits.map(p =>
        p.id === id ? { ...p, position } : p
      ));
    }
  };

  const updatePostitContentHandler = async (id, content) => {
    const success = await dbUpdatePostitContent(id, content);
    if (success) {
      setPostits(postits.map(p =>
        p.id === id ? { ...p, content } : p
      ));
    }
  };

  const removePostitHandler = async (id) => {
    const success = await dbRemovePostit(id);
    if (success) {
      setPostits(postits.filter(p => p.id !== id));
    }
  };

  return (
    <div className="main-container">
      <div className="header-content">
        <h1 className="main-title">Fridge Door</h1>
        <p className="subtitle">Leave a message for me when you are bored</p>
        <button 
          className="add-button" 
          onClick={addPostitHandler}
        >
          Add Postit
        </button>
      </div>
      {magnets.map(magnet => (
        <Magnet
          key={magnet.id}
          id={magnet.id}
          position={magnet.position}
          onDragStop={(_, data) => updateMagnetPositionHandler(magnet.id, { x: data.x, y: data.y })}
        />
      ))}
      {postits.map(postit => (
        <Postit 
          key={postit.id} 
          id={postit.id} 
          position={postit.position}
          content={postit.content}
          onClose={() => removePostitHandler(postit.id)}
          onDragStop={(_, data) => updatePostitPositionHandler(postit.id, { x: data.x, y: data.y })}
          onContentChange={(content) => updatePostitContentHandler(postit.id, content)}
        />
      ))}
    </div>
  );
};

export default MainPage;

