import React, { useState } from 'react';
import { NavigationButtons } from './NavigationButtons';

interface FinalSectionProps {
  onPrevious: () => void;
  onSubmit: () => Promise<void>;
}

export function FinalSection({ onPrevious, onSubmit }: FinalSectionProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage('');
    
    try {
      await onSubmit();
      setMessage('✅ Respostas enviadas com sucesso!');
    } catch (error) {
      setMessage('❌ Erro ao enviar respostas. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-800 bg-opacity-80 rounded-xl p-6 mb-7 border border-white border-opacity-8">
      <h2 className="text-xl mb-4 text-orange-600">Final</h2>
      <p className="text-white mb-5">Obrigado por responder!</p>
      
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="bg-orange-600 hover:bg-orange-400 transform hover:-translate-y-px transition-all duration-200 border-none text-white py-2.5 px-4 rounded-lg font-semibold cursor-pointer text-sm"
        >
          Voltar
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`border-none text-white py-2.5 px-4 rounded-lg font-semibold cursor-pointer text-sm transition-all duration-200 transform ${
            isSubmitting 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-orange-600 hover:bg-orange-400 hover:-translate-y-px'
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar respostas'}
        </button>
      </div>

      {message && (
        <div className={`mt-3 ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </div>
      )}
    </div>
  );
}