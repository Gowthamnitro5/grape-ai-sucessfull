import React, { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";

// Define the shape of the location data
interface GpsLocation {
  latitude: string;
  longitude: string;
}

// Define the shape of the context
interface LocationContextType {
  location: GpsLocation | null;
  setLocation: React.Dispatch<React.SetStateAction<GpsLocation | null>>;
}

// Create the context
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Create a custom hook to use the LocationContext
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

// Create the LocationProvider component
export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<GpsLocation | null>(null);

  // Fetch location on mount
  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const locationData = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: locationData.coords.latitude.toString(),
          longitude: locationData.coords.longitude.toString(),
        });
      } else {
        console.log("Location permission not granted");
        setLocation({
          latitude: "0", // Default or placeholder latitude
          longitude: "0", // Default or placeholder longitude
        });
      }
    };
    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
