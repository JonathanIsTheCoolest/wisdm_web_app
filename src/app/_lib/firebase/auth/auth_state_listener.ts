import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth"

export const observeAuthStateChange = (callback: Function) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      callback(uid)
    } else {
      // User is signed out
      callback(null)
    }
  });
};