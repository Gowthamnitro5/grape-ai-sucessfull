import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/utils/supabase";

const GoogleAuth = () => {
  try {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      // webClientId:"237462028293-60lq592ocvmsed34tuij1lc4vj6hha00.apps.googleusercontent.coms",
    });

    console.log("Auth-Native component is loaded.");

    return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(`UserInfo : ${userInfo}`);

            if (userInfo.data?.idToken) {
              // const { data, error } = await supabase.auth.signInWithIdToken({
              //   provider: "google",
              //   token: userInfo.data.idToken,
              // });
              // console.log(error, data);
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
        }}
      />
    );
  } catch (error: any) {
    console.log(error);
  }
};

export default GoogleAuth;
