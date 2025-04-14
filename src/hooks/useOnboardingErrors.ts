import { useState, useCallback } from "react";

export interface FieldErrors {
  [key: string]: string | null;
}

export const useOnboardingErrors = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const setFieldError = useCallback((field: string, error: string | null) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);
  const clearAllErrors = useCallback(() => {
    setFormError(null);
    setFieldErrors({});
  }, []);
  const clearFieldErrors = useCallback(() => {
    setFieldErrors({});
  }, []);
  const hasErrors = useCallback(() => {
    return !!formError || Object.values(fieldErrors).some((error) => !!error);
  }, [formError, fieldErrors]);
  const validateRequired = useCallback(
    (
      fieldName: string,
      value: any,
      errorMessage: string = "This field is required"
    ) => {
      const isEmpty =
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        setFieldError(fieldName, errorMessage);
        return false;
      }

      setFieldError(fieldName, null);
      return true;
    },
    [setFieldError]
  );

  return {
    formError,
    setFormError,
    fieldErrors,
    setFieldErrors,
    setFieldError,
    clearAllErrors,
    clearFieldErrors,
    hasErrors,
    validateRequired,
  };
};
