import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/_lib/firebase/auth/auth'

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user
    const token = await user.getIdToken()

    const userInfo = {
      user,
      tokens: {
        idToken: token
      }
    }

    return userInfo
  } catch(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error({
      errorCode,
      errorMessage
    })

    return (error)
  } finally {
    // Run any cleanup
  }
}
