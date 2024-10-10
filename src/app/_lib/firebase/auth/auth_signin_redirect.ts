import { signInWithRedirect, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";
import { AppleProvider } from "./apple/auth_apple_provider_create";

export const federatedRedirectSignIn = (provider: FacebookAuthProvider | GoogleAuthProvider | typeof AppleProvider) => {
  return signInWithRedirect(auth, provider);
}