import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema setup functions
export const createTables = async () => {
  // Users table (handled by Supabase Auth)
  
  // State Law Guides table
  const { error: stateLawError } = await supabase.rpc('create_state_law_guides_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS state_law_guides (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        state VARCHAR(50) NOT NULL UNIQUE,
        guide_content JSONB NOT NULL,
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  })
  
  // Encounter Records table
  const { error: encounterError } = await supabase.rpc('create_encounter_records_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS encounter_records (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
        location TEXT,
        officer_details JSONB,
        notes TEXT,
        audio_file_path TEXT,
        shareable_card_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Enable Row Level Security
      ALTER TABLE encounter_records ENABLE ROW LEVEL SECURITY;
      
      -- Create policy for users to only access their own records
      CREATE POLICY "Users can only access their own encounter records" ON encounter_records
        FOR ALL USING (auth.uid() = user_id);
    `
  })
  
  if (stateLawError) console.error('Error creating state_law_guides table:', stateLawError)
  if (encounterError) console.error('Error creating encounter_records table:', encounterError)
}

// Auth functions
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// State Law Guides functions
export const getStateLawGuide = async (state) => {
  const { data, error } = await supabase
    .from('state_law_guides')
    .select('*')
    .eq('state', state)
    .single()
  
  return { data, error }
}

export const getAllStateLawGuides = async () => {
  const { data, error } = await supabase
    .from('state_law_guides')
    .select('state, last_updated')
    .order('state')
  
  return { data, error }
}

export const upsertStateLawGuide = async (state, guideContent) => {
  const { data, error } = await supabase
    .from('state_law_guides')
    .upsert({
      state,
      guide_content: guideContent,
      last_updated: new Date().toISOString()
    })
    .select()
  
  return { data, error }
}

// Encounter Records functions
export const createEncounterRecord = async (encounterData) => {
  const { data, error } = await supabase
    .from('encounter_records')
    .insert([encounterData])
    .select()
  
  return { data, error }
}

export const getUserEncounterRecords = async (userId) => {
  const { data, error } = await supabase
    .from('encounter_records')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const updateEncounterRecord = async (id, updates) => {
  const { data, error } = await supabase
    .from('encounter_records')
    .update(updates)
    .eq('id', id)
    .select()
  
  return { data, error }
}

export const deleteEncounterRecord = async (id) => {
  const { error } = await supabase
    .from('encounter_records')
    .delete()
    .eq('id', id)
  
  return { error }
}
