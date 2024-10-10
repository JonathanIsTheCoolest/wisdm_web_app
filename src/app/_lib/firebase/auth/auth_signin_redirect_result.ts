import { getRedirectResult } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";

// Result from Redirect auth flow.
export const getSignInRedirectResults = (Provider: any) => {
  getRedirectResult(auth)
  .then((result) => {
    const credential = Provider.credentialFromResult(result);
    // You can also get the Apple OAuth Access and ID Tokens.
    const accessToken = credential?.accessToken;
    const idToken = credential?.idToken ?? null;
    // The signed-in user info.
    const user = result?.user;

    return {
      user,
      tokens: {
        accessToken,
        idToken
      }
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = Provider.credentialFromError(error);
    return {
      errorCode,
      errorMessage,
      email,
      credential
    }
  });
}