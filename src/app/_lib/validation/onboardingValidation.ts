export const validateMinArrayLength = (
  arr: string[],
  minCount: number
): { isValid: boolean; errorMessage: string | null } => {
  if (!Array.isArray(arr) || arr.length < minCount) {
    return {
      isValid: false,
      errorMessage: `Please select at least ${minCount} options`,
    };
  }
  return { isValid: true, errorMessage: null };
};

export const validateRequired = (
  value: any,
  fieldName: string
): { isValid: boolean; errorMessage: string | null } => {
  const isEmpty =
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);

  if (isEmpty) {
    return {
      isValid: false,
      errorMessage: `${fieldName} is required`,
    };
  }
  return { isValid: true, errorMessage: null };
};

export const validateEmail = (
  email: string
): { isValid: boolean; errorMessage: string | null } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid email address",
    };
  }
  return { isValid: true, errorMessage: null };
};

export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string
): { isValid: boolean; errorMessage: string | null } => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      errorMessage: "Passwords do not match",
    };
  }
  return { isValid: true, errorMessage: null };
};

export const validatePasswordStrength = (
  password: string,
  minLength: number = 8
): { isValid: boolean; errorMessage: string | null } => {
  if (!password || password.length < minLength) {
    return {
      isValid: false,
      errorMessage: `Password must be at least ${minLength} characters long`,
    };
  }
  return { isValid: true, errorMessage: null };
};
