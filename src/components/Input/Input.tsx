import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label,
  error,
  className,
  ...props 
}) => {
  const inputClass = [
    styles.input,
    error ? styles.error : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={inputClass} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};