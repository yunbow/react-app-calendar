import React from 'react';
import styles from './Text.module.css';

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: 'primary' | 'secondary' | 'muted';
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({ 
  variant = 'body',
  color = 'primary',
  children,
  className
}) => {
  const textClass = [
    styles.text,
    styles[variant],
    styles[color],
    className
  ].filter(Boolean).join(' ');

  const Component = variant.startsWith('h') ? variant as 'h1' | 'h2' | 'h3' : 'span';

  return (
    <Component className={textClass}>
      {children}
    </Component>
  );
};