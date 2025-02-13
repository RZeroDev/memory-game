import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ emoji, isFlipped, onClick }) => {
  return (
    <div
      className="aspect-square relative cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-full h-full bg-white rounded-xl flex items-center justify-center text-4xl shadow-lg backface-hidden" />
        <div
          className="absolute w-full h-full bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center text-4xl transform rotate-y-180 backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {emoji}
        </div>
      </motion.div>
    </div>
  );
}