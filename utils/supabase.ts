import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";

const supabaseUrl = "https://ajqrjbwizdylkmdecnvw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcXJqYndpemR5bGttZGVjbnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMDk4OTIsImV4cCI6MjA0Mzg4NTg5Mn0.qEuTo-TpivL8esBANK3dlu9UsUVt-83mABK84bG7I9g";

if (!supabaseUrl || !supabaseAnonKey) {
  console.log(`Supabase credential's are missing!`);
  throw Error(`Supabase credential's are missing`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === "android" ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export type profile = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
  soilType: string;
  farmArea: string;
  referralCode: string;
  landRevenueSurveyNo: string;
};
