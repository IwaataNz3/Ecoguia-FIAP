import React from 'react';
import type { PropsWithChildren } from 'react';

// Propriedades aceitas pelo componente de botão
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

// Componente de Botão principal reutilizável
const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "font-bold rounded-lg transition-all duration-300 outline-none";
  const widthClasses = fullWidth ? "w-full" : "inline-block";
  
  let variantClasses = "";
  if (variant === 'primary') {
    variantClasses = "bg-emerald-500 text-white hover:bg-emerald-600 py-3 px-6 rounded-md";
  } else if (variant === 'secondary') {
    variantClasses = "text-emerald-500 border-2 border-emerald-500 bg-transparent hover:bg-emerald-500 hover:text-white hover:-translate-y-1 shadow-none hover:shadow-lg py-4 px-10 rounded-full";
  } else if (variant === 'outline') {
    variantClasses = "border border-slate-200 bg-transparent text-slate-800 hover:border-emerald-500 py-3 px-6";
  }

  return (
    <button 
      className={`${baseClasses} ${widthClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
