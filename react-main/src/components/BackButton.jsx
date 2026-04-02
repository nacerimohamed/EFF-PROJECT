import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BackButton = ({ className = '', label = 'Retour' }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(-1)}
      whileHover={{ scale: 1.05, x: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`
        group inline-flex items-center gap-3 
        px-5 py-2.5 
        bg-gradient-to-r from-emerald-700 to-emerald-800 
        hover:from-emerald-800 hover:to-emerald-900 
        text-amber-50 
        font-medium 
        rounded-full 
        shadow-md hover:shadow-lg 
        transition-all duration-300 
        border border-emerald-600/30 
        backdrop-blur-sm
        ${className}
      `}
    >
      <motion.svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        animate={{ x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </motion.svg>
      <span className="text-sm tracking-wide">{label}</span>
    </motion.button>
  );
};

export default BackButton;