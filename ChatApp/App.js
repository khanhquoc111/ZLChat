import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { supabase } from './src/api/supabase';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ChatScreen from './src/screens/ChatScreen';

export default function App() {
  const [session, setSession] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      {session && session.user ? (
        <ChatScreen user={session.user} />
      ) : isRegistering ? (
        <RegisterScreen onSwitch={() => setIsRegistering(false)} />
      ) : (
        <LoginScreen onSwitch={() => setIsRegistering(true)} />
      )}
    </SafeAreaProvider>
  );
}