import React from 'react';

interface NavigationButtonsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  canProceed?: boolean;
}

export function NavigationButtons({ 
  currentPage, 
  totalPages, 
  onPrevious, 
  onNext, 
  canProceed = true 
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-5">
      {currentPage > 0 ? (
        <button
          onClick={onPrevious}
          className="bg-orange-800 hover:bg-orange-400 transform hover:-translate-y-px transition-all duration-200 border-none text-white py-2.5 px-4 rounded-lg font-semibold cursor-pointer text-sm"
        >
          Voltar
        </button>
      ) : (
        <span></span>
      )}
      
      {currentPage < totalPages - 1 && (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`border-none text-white py-2.5 px-4 rounded-lg font-semibold cursor-pointer text-sm transition-all duration-200 transform ${
            canProceed 
              ? 'bg-orange-800 hover:bg-orange-400 hover:-translate-y-px' 
              : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          Avançar
        </button>
      )}
    </div>
  );
}