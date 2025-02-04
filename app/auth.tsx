import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import BasicAuth from "@/components/supabase/BasicAuth";

export default function Auth({ navigation }: any) {
  const [session, setSession] = useState<Session | null>(null);

  // Handle session changes
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    // Check session on initial render
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Navigate when session changes and user is authenticated
  useEffect(() => {
    if (session && session.user) {
      navigation.navigate("(tabs)");
    }
  }, [session]);

  return <BasicAuth />;
}
