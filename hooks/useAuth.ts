import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: any;
}

export const useAuth = () => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log(data, error)
      if (data?.session) {
        setSession(data.session);
      }
      setLoading(false);
    };

    checkSession();

    // Listen for session changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
};
