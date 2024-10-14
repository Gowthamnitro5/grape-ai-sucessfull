import React, { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";

// Define the shape of the Data.
interface Location {
  latitude: string;
  longitude: string;
}

interface Profile {
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

const init: Profile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  address: "123 Main St, Anytown, USA",
  predictionsCount: 0,
};

// Define the shape of the context
interface contextType {
  location: Location | null;
  userProfile: Profile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  fetchProfile: () => Promise<void>;
  fetchLocation: () => Promise<void>;
}

// Create the context
const dataContext = createContext<contextType | undefined>(undefined);

// Create a custom hook to use the dataContext
export const useDataService = () => {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useApp must be used within a LocationProvider");
  }
  return context;
};

// Create the Data-Provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<Profile | null>(init);
  const [location, setLocation] = useState<Location | null>(null);

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
      console.log("Location permission not granted");
      setLocation(null); // Handle denied location case
    }
  };

  // Function to fetch user profile data (from Supabase or another API)
  const fetchProfile = async () => {
    return;
  };

  // Fetch user profile and location on component mount
  useEffect(() => {
    fetchProfile();
    fetchLocation();
  }, []);

  return (
    <dataContext.Provider
      value={{
        userProfile,
        location,
        setUserProfile,
        setLocation,
        fetchProfile,
        fetchLocation,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
