import { signUpWithEmailAndPassword } from "@/app/_lib/firebase/auth/auth_signup_password";
import { isCorrectEmailFormat } from "@/app/_lib/email/isCorrectEmailFormat";
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

export const onClickFirebaseEmailPasswordSignUp = async (
  router: any,
  email: string,
  password: string,
  duplicatePassword: string,
  setField: (field: string, value: string) => void
) => {
  // if (isCorrectEmailFormat(email) && isPasswordVerified(password, duplicatePassword)) {
  //   try {
  //     const result = await signUpWithEmailAndPassword(email, password);
  //     if (result?.user) router.push("/signup/personal");
  //   } catch (error: any) {
  //     console.error(`Sign up error: ${error}`);
  //     setField("passwordError", error.message);
  //   }
  // }
  router.push("/login/signup/personal")
};