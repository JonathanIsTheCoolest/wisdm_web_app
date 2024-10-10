import { signOut } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";

export const onSignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}