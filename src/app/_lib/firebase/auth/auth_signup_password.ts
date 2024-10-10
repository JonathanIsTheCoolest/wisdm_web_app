import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/_lib/firebase/auth/auth'

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
