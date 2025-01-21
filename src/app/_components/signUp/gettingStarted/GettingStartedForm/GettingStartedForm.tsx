import React from "react";
import InputTemplate from "@/app/_components/inputs/InputTemplate/InputTemplate";
import SuggestedPassword from "@/app/_components/signUp/gettingStarted/SuggestedPassword/SuggestedPassword";
import { handleChange, passwordErrorLogic } from "@/app/_components/signUp/gettingStarted/gettingStartedHelper";
import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";

const GettingStartedForm = ({ formState, setField }: {formState: any, setField: any}) => {
  const {
    email,
    password,
    duplicatePassword,
    emailError,
    passwordError,
    duplicatePasswordError,
    suggestedPassword,
  } = formState;

  const inputArray = [
    {
      id: "email",
      type: "email",
      value: email,
      text: "Email",
      placeholder: "Email",
      errorMessage: emailError,
    },
    {
      id: "password",
      type: "password",
      value: password,
      text: "Password",
      placeholder: "Password",
      errorMessage: passwordError,
      onChange: passwordErrorLogic,
      onChangeParameters: duplicatePassword,
      children: (
        <SuggestedPassword
          password={password}
          duplicatePassword={duplicatePassword}
          suggestedPassword={suggestedPassword}
          setField={setField}
        />
      ),
    },
  ];

  return (
    <div className={styles.labelWrapper}>
      {inputArray.map((item) => {
        const {id, type, value, text, placeholder, errorMessage, onChange, onChangeParameters} = item
        return (
        <InputTemplate
          key={id}
          id={id}
          name={id}
          type={type}
          value={value}
          text={text}
          placeholder={placeholder}
          errorMessage={errorMessage}
          onChange={(e) =>
            handleChange(e, setField, onChange, onChangeParameters)
          }
        >
          {item.children}
        </InputTemplate>
      )})}
      {password && (
        <InputTemplate
          id="duplicatePassword"
          name="duplicatePassword"
          type="password"
          value={duplicatePassword}
          text="Verify Password"
          placeholder="Re-enter Password"
          errorMessage={duplicatePasswordError}
          onChange={(e) => handleChange(e, setField, passwordErrorLogic, password)}
        />
      )}
    </div>
  );
};

export default GettingStartedForm;