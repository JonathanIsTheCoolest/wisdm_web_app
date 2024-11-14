import React, { ReactNode } from 'react';

interface InputProps {
  id: string;
  type: string;
  value: string;
  text: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

const InputTemplate: React.FC<InputProps> = ({
  id,
  type,
  value,
  text,
  name,
  placeholder = '',
  errorMessage = '',
  containerClass = '',
  labelClass = '',
  inputClass = '',
  errorClass = '',
  onClick,
  onChange,
  onBlur,
  children
}) => {
  return (
    <div key={id} className={containerClass} style={{position: 'relative'}}>
      <label htmlFor={id} className={labelClass}>
        {text}
      </label>
      {errorMessage && <span className={errorClass}> {errorMessage}</span>}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onClick={onClick}
        onChange={onChange}
        onBlur={onBlur}
        className={inputClass}
      />
      {children && children}
    </div>
  );
};

export default InputTemplate;