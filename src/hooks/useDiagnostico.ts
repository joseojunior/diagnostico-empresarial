import { useState, useEffect } from 'react';
import { Contato, Respostas, Draft, UTMs } from '../types';
import { STORAGE_KEY } from '../constants';

export function useDiagnostico() {
  const [currentPage, setCurrentPage] = useState(0);
  const [contato, setContato] = useState<Contato>({
    nome: '',
    email: '',
    telefone: ''
  });
  const [respostas, setRespostas] = useState<Respostas>({});

  const saveDraft = () => {
    const draft: Draft = { contato, respostas };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  };

  const loadDraft = () => {
    try {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (draft) {
        const parsedDraft: Draft = JSON.parse(draft);
        setContato(parsedDraft.contato || { nome: '', email: '', telefone: '' });
        setRespostas(parsedDraft.respostas || {});
      }
    } catch (error) {
      console.error('Erro ao carregar rascunho:', error);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const getUTMs = (): UTMs => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get("utm_source"),
      utm_medium: urlParams.get("utm_medium"),
      utm_campaign: urlParams.get("utm_campaign"),
      utm_term: urlParams.get("utm_term"),
      utm_content: urlParams.get("utm_content")
    };
  };

  const updateResposta = (questionId: string, value: string) => {
    setRespostas(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  useEffect(() => {
    loadDraft();
  }, []);

  useEffect(() => {
    if (contato.nome || contato.email || contato.telefone || Object.keys(respostas).length > 0) {
      saveDraft();
    }
  }, [contato, respostas]);

  return {
    currentPage,
    setCurrentPage,
    contato,
    setContato,
    respostas,
    updateResposta,
    saveDraft,
    loadDraft,
    clearDraft,
    getUTMs
  };
}