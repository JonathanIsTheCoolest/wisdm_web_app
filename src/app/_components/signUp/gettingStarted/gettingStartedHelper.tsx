import { signUpWithEmailAndPassword } from "@/app/_lib/firebase/auth/auth_signup_password";
import { isCorrectEmailFormat } from "@/app/_lib/email/isCorrectEmailFormat";
import { useRouter } from "next/navigation";

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
  email: string,
  password: string,
  duplicatePassword: string,
  setField: (field: string, value: string) => void
) => {
  const router = useRouter();
  if (isCorrectEmailFormat(email) && isPasswordVerified(password, duplicatePassword)) {
    try {
      const result = await signUpWithEmailAndPassword(email, password);
      if (result?.user) router.push("/signup/personal");
    } catch (error: any) {
      console.error(`Sign up error: ${error}`);
      setField("passwordError", error.message);
    }
  }
};