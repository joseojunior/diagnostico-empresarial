import React from 'react';

interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
}

export function ProgressBar({ currentPage, totalPages }: ProgressBarProps) {
  const percent = Math.min(100, (currentPage / (totalPages - 1)) * 100);

  return (
    <div className="h-2 bg-white bg-opacity-10 rounded-xl overflow-hidden mb-5">
      <div 
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${percent}%`,
          background: 'linear-gradient(90deg, #EA580C, #FB923C)'
        }}
      />
    </div>
  );
}