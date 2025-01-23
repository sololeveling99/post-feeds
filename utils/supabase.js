import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://thwatgxmporgpikevgsg.supabase.co';  
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRod2F0Z3htcG9yZ3Bpa2V2Z3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODQ1NjIsImV4cCI6MjA1Mjk2MDU2Mn0.nH-ZUhTacJq3r_WqDbV0WRRXQqe5y2BuLeworPsPJYg';

export const supabase = createClient(
  SUPABASE_URL || "",
  SUPABASE_ANON_KEY || "",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
        