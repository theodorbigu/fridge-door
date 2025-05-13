import { supabase } from './supabase';

// Magnets actions
export const loadMagnets = async (initialMagnets) => {
  const { data, error } = await supabase
    .from('magnets')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('Error loading magnets:', error);
    return null;
  }

  if (data.length > 0) {
    return data;
  } else {
    // If no magnets in DB, initialize them
    const { error: insertError } = await supabase
      .from('magnets')
      .insert(initialMagnets);
    
    if (insertError) {
      console.error('Error initializing magnets:', insertError);
      return null;
    }
    return initialMagnets;
  }
};

export const updateMagnetPosition = async (id, position) => {
  const { error } = await supabase
    .from('magnets')
    .update({ position })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating magnet position:', error);
    return false;
  }
  return true;
};

// Postits actions
export const loadPostits = async () => {
  const { data, error } = await supabase
    .from('postits')
    .select('*')
    .order('created_at');
  
  if (error) {
    console.error('Error loading postits:', error);
    return null;
  }
  return data || [];
};

export const addPostit = async (position) => {
  const newPostit = {
    position,
    content: ''  // Start with empty content
  };

  const { data, error } = await supabase
    .from('postits')
    .insert(newPostit)
    .select()
    .single();

  if (error) {
    console.error('Error adding postit:', error);
    return null;
  }
  return data;
};

export const updatePostitPosition = async (id, position) => {
  const { error } = await supabase
    .from('postits')
    .update({ position })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating postit position:', error);
    return false;
  }
  return true;
};

export const updatePostitContent = async (id, content) => {
  const { error } = await supabase
    .from('postits')
    .update({ content })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating postit content:', error);
    return false;
  }
  return true;
};

export const removePostit = async (id) => {
  const { error } = await supabase
    .from('postits')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error removing postit:', error);
    return false;
  }
  return true;
};
