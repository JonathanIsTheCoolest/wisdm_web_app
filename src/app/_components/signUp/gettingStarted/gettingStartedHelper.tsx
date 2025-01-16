import { signUpWithEmailAndPassword } from "@/app/_lib/firebase/auth/auth_signup_password";
import { isCorrectEmailFormat } from "@/app/_lib/user/email/isCorrectEmailFormat";
import { Filter } from "bad-words";

const filter = new Filter();

export const setField = (formDispatch: any, field: string, value: string) => {
  formDispatch({ type: "SET_FIELD", field, value });
};

export const handleChange = (
  e : React.ChangeEvent<HTMLInputElement>,
  setField: (field: string, value: string) => void,
  cb: (setField: (field: string, value: string) => void, e: React.ChangeEvent<HTMLInputElement>, ...args: any[]) => void = () => {},
  ...additionalArgs: any[]
) => {
  const { name, value } = e.target
  setField(name, value);
  cb(setField, e, ...additionalArgs);
};

export const nameErrorLogic = (
  setField: (field: string, value: string) => void,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { value, name } = e.target  
  const errorFieldName = `${name}Error`
  const namePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  let errorMessage = ""
  let isProfane = false

  if (!value.length) {
    setField(errorFieldName, errorMessage)
    return
  }

  if (!namePattern.test(value)) {
    errorMessage = "Hmmm this doesn't look like a name..."
  }

  if (filter.isProfane(value)) {
    if (errorMessage.length) {
      errorMessage = `${errorMessage} and it might be inappropriate`
    } else {
      errorMessage = 'Hmmm this might be inappropriate'
    }
  }

  setField(errorFieldName, errorMessage)
}

export const passwordErrorLogic = (
  setField: (field: string, value: string) => void,
  e: React.ChangeEvent<HTMLInputElement>,
  password: string,
) => {
  const { value } = e.target
  const isEqual = value === password;
  const errorFieldName = "duplicatePasswordError";
  setField(errorFieldName, isEqual ? "" : "Oops, the passwords don't match");
};

export const isPasswordVerified = (password: string, duplicatePassword: string) =>
  password === duplicatePassword && password.length > 0;

export const moderationRequest = async(name: string) => {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
  try {
    const moderationResponse = await fetch(`${BASE_API_URL}/users/post/moderate_name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: name
      }),
    })
    const result = await moderationResponse.json()
    return result
  } catch (e) {
    return {
      error: e
    }
  }
}

export const onClickFirebaseEmailPasswordSignUp = async (
  router: any,
  fullName: string,
  email: string,
  password: string,
  duplicatePassword: string,
  setField: (field: string, value: string) => void
) => {
  if (fullName) {
    const result = await moderationRequest(fullName)
    if (result.error) {
      console.error(result.error)
      return {error: result.error}
    } else {
      const {isProblematic, problematicWords} = result
      if (isProblematic) {
        setField('fullNameError', `We\'ve detected the use of the following profanity: ${problematicWords}. If you feel there's been a mistake please re-enter your name and try again.`)
      } else {
        if (isCorrectEmailFormat(email) && isPasswordVerified(password, duplicatePassword)) {
          try {
            const result: any = await signUpWithEmailAndPassword(email, password);
            if (result?.user) {
              // router.push("/login/signup/personal")
            } else if (result?.errorCode) {
              const { errorMessage, errorCode } = result
              if (errorCode === "auth/weak-password") {
                setField("passwordError", errorMessage)
              } else {
                setField("emailError", errorMessage)
              }
            }
          } catch (error: any) {
            console.error(`Sign up error: ${error}`);
            setField("passwordError", error.message);
          }
        }
      }
    }
  }
  console.log('success')
};