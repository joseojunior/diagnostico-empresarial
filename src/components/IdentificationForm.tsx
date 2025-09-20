import React from 'react';
import { Contato } from '../types';
import { NavigationButtons } from './NavigationButtons';

interface IdentificationFormProps {
  contato: Contato;
  onContatoChange: (contato: Contato) => void;
  currentPage: number;
  totalPages: number;
  onNext: () => void;
}

export function IdentificationForm({ 
  contato, 
  onContatoChange, 
  currentPage, 
  totalPages, 
  onNext 
}: IdentificationFormProps) {
  const canProceed = contato.nome && contato.email && contato.telefone;

  const handleChange = (field: keyof Contato, value: string) => {
    onContatoChange({
      ...contato,
      [field]: value
    });
  };

  return (
    <div className="bg-slate-800 bg-opacity-80 rounded-xl p-6 mb-7 border border-white border-opacity-8">
      <h2 className="text-xl mb-4 text-orange-600">Identificação</h2>
      
      <div className="space-y-4">
        <label className="block">
          <span className="text-white mb-1 block">Nome:</span>
          <input
            type="text"
            value={contato.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            required
            className="w-full p-3 rounded-lg border-none bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </label>

        <label className="block">
          <span className="text-white mb-1 block">E-mail:</span>
          <input
            type="email"
            value={contato.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className="w-full p-3 rounded-lg border-none bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </label>

        <label className="block">
          <span className="text-white mb-1 block">Telefone:</span>
          <input
            type="tel"
            value={contato.telefone}
            onChange={(e) => handleChange('telefone', e.target.value)}
            required
            className="w-full p-3 rounded-lg border-none bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </label>
      </div>

      <NavigationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => {}}
        onNext={onNext}
        canProceed={canProceed}
      />
    </div>
  );
}