import { signInWithRedirect, AuthProvider } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";

export const federatedRedirectSignIn = (provider: AuthProvider) => {
  return signInWithRedirect(auth, provider);
}