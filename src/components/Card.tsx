import { ReactNode } from 'react';

interface CardProps{
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', hover = false, style }: CardProps) {
  return (
    <div className={`bg-card rounded-xl shadow-sm border border-border/50 ${hover ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-border/50 ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 border-t border-border/50 ${className}`}>
      {children}
    </div>
  );
}
