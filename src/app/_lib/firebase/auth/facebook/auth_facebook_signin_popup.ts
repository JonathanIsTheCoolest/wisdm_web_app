import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";
import { provider } from "@/app/_lib/firebase/auth/facebook/auth_facebook_provider_create";


export const facebookSignInWithPopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
    const idToken = credential?.idToken

    const userInfo =  {
      user,
      tokens: {
        accessToken,
        idToken
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
    const credential = FacebookAuthProvider.credentialFromError(error);

    console.error({
      errorCode,
      errorMessage,
      emailError: email,
      credentialError: credential
    })

    // ...
  } finally {
  }
}