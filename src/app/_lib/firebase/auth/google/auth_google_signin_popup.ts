'use client'

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";
import { provider } from "@/app/_lib/firebase/auth/google/auth_google_provider_create";

export const googleSignInWithPopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential: any = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    const userInfo = {
      user,
      tokens: {
        accessToken: token
      }
    }

    console.log(userInfo)

    return userInfo
  } catch(error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error({
        errorCode,
        errorMessage,
        emailError: email,
        credentialError: credential
      })
  } finally {
    // write some cleanup
  }
}