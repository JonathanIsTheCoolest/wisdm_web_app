import { generatePassword } from "@/app/_lib/password/generatePassword";

export type State = {
  fullName: string;
  email: string;
  password: string;
  duplicatePassword: string;
  fullNameError: string;
  emailError: string;
  passwordError: string;
  duplicatePasswordError: string;
  suggestedPassword: string;
};

export type Action =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'RESET_FORM' };

export const initialFormReducerState: State = {
  fullName: '',
  email: '',
  password: '',
  duplicatePassword: '',
  fullNameError: '',
  emailError: '',
  passwordError: '',
  duplicatePasswordError: '',
  suggestedPassword: generatePassword(),
};

export const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return { ...initialFormReducerState, suggestedPassword: generatePassword() };
    default:
      return state;
  }
}