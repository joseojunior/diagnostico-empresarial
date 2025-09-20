import React from 'react';
import { Pergunta, Respostas } from '../types';
import { OPCOES_RESPOSTA } from '../constants';
import { NavigationButtons } from './NavigationButtons';

interface QuestionSectionProps {
  pergunta: Pergunta;
  sectionIndex: number;
  respostas: Respostas;
  onRespostaChange: (questionId: string, value: string) => void;
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function QuestionSection({ 
  pergunta, 
  sectionIndex, 
  respostas, 
  onRespostaChange,
  currentPage,
  totalPages,
  onPrevious,
  onNext
}: QuestionSectionProps) {
  return (
    <div className="bg-slate-800 bg-opacity-80 rounded-xl p-4 md:p-6 mb-7 border border-white border-opacity-8">
      <h2 className="text-lg md:text-xl mb-4 text-orange-600">{pergunta.titulo}</h2>
      
      {/* Versão Desktop - Tabela */}
      <div className="hidden md:block">
        <table className="w-full border-collapse mt-5 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-3 text-center font-semibold text-sm bg-orange-800  text-white">
                Pergunta
              </th>
              {OPCOES_RESPOSTA.map(opcao => (
                <th key={opcao} className="p-3 text-center font-semibold text-sm bg-orange-800 text-white">
                  {opcao}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pergunta.qs.map((q, questionIndex) => {
              const questionId = `q${sectionIndex + 1}_${questionIndex + 1}`;
              return (
                <tr key={questionIndex} className="hover:-translate-y-px">
                  <td className="p-3 text-left text-sm text-slate-200 border-b border-white border-opacity-7 last:border-b-0">
                    {sectionIndex + 1}.{questionIndex + 1}) {q}
                  </td>
                  {OPCOES_RESPOSTA.map(opcao => (
                    <td key={opcao} className="p-3 text-center border-b border-white border-opacity-7 last:border-b-0">
                      <input
                        type="radio"
                        name={questionId}
                        value={opcao}
                        checked={respostas[questionId] === opcao}
                        onChange={(e) => onRespostaChange(questionId, e.target.value)}
                        className="accent-orange-600 transform scale-110"
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Versão Mobile - Cards */}
      <div className="md:hidden space-y-4 mt-5">
        {pergunta.qs.map((q, questionIndex) => {
          const questionId = `q${sectionIndex + 1}_${questionIndex + 1}`;
          return (
            <div key={questionIndex} className="bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-white border-opacity-5">
              <h3 className="text-sm text-slate-200 mb-3 font-medium">
                {sectionIndex + 1}.{questionIndex + 1}) {q}
              </h3>
              
              <div className="space-y-2">
                {OPCOES_RESPOSTA.map(opcao => (
                  <label key={opcao} className="flex items-center space-x-3 cursor-pointer hover:bg-slate-600 hover:bg-opacity-30 rounded-md p-2 transition-colors">
                    <input
                      type="radio"
                      name={questionId}
                      value={opcao}
                      checked={respostas[questionId] === opcao}
                      onChange={(e) => onRespostaChange(questionId, e.target.value)}
                      className="accent-orange-600 transform scale-110 flex-shrink-0"
                    />
                    <span className="text-sm text-slate-300">{opcao}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <NavigationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
}