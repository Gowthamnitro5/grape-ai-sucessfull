import React, { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

// Define the shape of the Data.
interface Location {
  latitude: string;
  longitude: string;
}

interface Profile {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  address?: string;
  soilType?: string;
  farmArea?: string;
  referralCode?: string;
  landRevenueSurveyNo?: string;
  predictionsCount?: number;
}

export interface History {
  id: string;
  date: string;
  time: string;
  disease: string;
}

// Define the shape of the context
interface contextType {
  location: Location | null;
  userProfile: Profile | null;
  userHistory: History[] | null;
  setUserProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  setUserHistory: React.Dispatch<React.SetStateAction<History[] | null>>;
  fetchProfile: () => Promise<void>;
  fetchLocation: () => Promise<void>;
  fetchHistory: () => Promise<void>;
  session: Session | null;
}

// Create the context
const dataContext = createContext<contextType | undefined>(undefined);

// Create a custom hook to use the dataContext
export const useDataService = () => {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useDataService must be used within a DataProvider");
  }
  return context;
};

// Create the Data-Provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userHistory, setUserHistory] = useState<History[] | null>([]);

  // Function to fetch location data
  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude.toString(),
        longitude: location.coords.longitude.toString(),
      });
    } else {
      console.error("Location permission not granted");
      setLocation(null); // Handle denied location case
    }
  };

  // Fetch user profile from database.
  const fetchProfile = async () => {
    if (session?.user.id) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) throw new Error(error.message);

        if (!data) throw new Error("Empty Response");

        const user: Profile = {
          id: data?.id || "",
          name: data?.full_name || "",
          email: session.user.email || "",
          phone: data?.phone?.toString(),
          address: data?.address || "",
          soilType: data?.soil_type || "",
          farmArea: data?.farm_area?.toString() || "",
          referralCode: data?.referral_code || "",
          landRevenueSurveyNo: data?.land_revenue_survey_no?.toString() || "",
          predictionsCount: data?.predictions_count || 0,
        };
        setUserProfile(user);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Fetch User's predictions from database.
  const fetchHistory = async () => {
    const user_id = session?.user.id;
    try {
      const { data, error } = await supabase
        .from("predictions")
        .select(
          `
        id,
        date,
        time,
        disease
        `
        )
        .eq("user_id", user_id);

      if (error) throw new Error(error.message);
      if (!data) throw new Error("Empty Response");

      const items = data as History[];
      setUserHistory(items);
    } catch (error) {
      console.error(error);
    }
  };

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

  // fetch profile and history when there is a session changes.
  useEffect(() => {
    if (session && session.user) {
      fetchProfile();
      fetchHistory();
    }
  }, [session]);

  // Fetch location on component mount
  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <dataContext.Provider
      value={{
        userProfile,
        location,
        userHistory,
        setUserProfile,
        setLocation,
        setUserHistory,
        fetchProfile,
        fetchLocation,
        fetchHistory,
        session,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
