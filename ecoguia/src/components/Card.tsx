import React from 'react';
import type { PropsWithChildren } from 'react';

// Interface de props do Card
interface CardProps extends PropsWithChildren {
  className?: string;
  hoverable?: boolean;
}

// Componente Card base para agrupar conteúdo
const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  const baseClasses = "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm";
  const hoverClasses = hoverable ? "transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-lg" : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
