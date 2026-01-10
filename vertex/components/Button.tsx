
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cta' | 'outline' | 'ghost';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 rounded-full tap-scale";
  
  const variants = {
    primary: "bg-dark text-white hover:bg-zinc-800 shadow-xl",
    secondary: "bg-zinc-100 text-dark hover:bg-zinc-200 border border-zinc-200",
    cta: "bg-brand text-white hover:bg-brand/90 shadow-lg shadow-brand/20",
    outline: "bg-transparent text-dark border-2 border-dark hover:bg-dark hover:text-white",
    ghost: "bg-transparent text-zinc-400 hover:text-dark",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <motion.span 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      ) : children}
    </motion.button>
  );
};

export default Button;
