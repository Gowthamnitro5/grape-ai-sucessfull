import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/utils/supabase";

const GoogleAuth = () => {
  try {
    GoogleSignin.configure({
      webClientId:
        "76980460244-18jjhlg4tmdipd5etrvu6dptos80lb0l.apps.googleusercontent.com",
    });

    console.log("Auth-Native component is loaded.");

    const handleSignin = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        if (userInfo.data?.idToken) {          
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: userInfo.data.idToken,
          });
          if( error)
            throw new Error(error?.message);
        } else {
          throw new Error("no ID token present!");
        }
      } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log(`user cancelled the login flow`);
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log(`operation (e.g. sign in) is in progress already`);
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log(`play services not available or outdated`);
        } else {
          console.log(error);
        }
      }
    };

    return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleSignin}
        style={{ marginTop: 15 }}
      />
    );
  } catch (error: any) {
    console.log(error);
  }
};

export default GoogleAuth;
