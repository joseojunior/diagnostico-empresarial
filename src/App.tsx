import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { IdentificationForm } from './components/IdentificationForm';
import { QuestionSection } from './components/QuestionSection';
import { FinalSection } from './components/FinalSection';
import { LoadingOverlay } from './components/LoadingOverlay';
import { useDiagnostico } from './hooks/useDiagnostico';
import { perguntas } from './data/perguntas';
import { sendDiagnostico } from './services/api';

function App() {
  const {
    currentPage,
    setCurrentPage,
    contato,
    setContato,
    respostas,
    updateResposta,
    clearDraft,
    getUTMs
  } = useDiagnostico();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Total de páginas: 1 (identificação) + perguntas + 1 (final)
  const totalPages = 1 + perguntas.length + 1;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        contato,
        respostas,
        utms: getUTMs()
      };
      
      await sendDiagnostico(payload);
      clearDraft();
    } catch (error) {
      console.error('Erro ao enviar:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentPage = () => {
    // Página de identificação
    if (currentPage === 0) {
      return (
        <IdentificationForm
          contato={contato}
          onContatoChange={setContato}
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={nextPage}
        />
      );
    }
    
    // Páginas de perguntas
    if (currentPage <= perguntas.length) {
      const sectionIndex = currentPage - 1;
      return (
        <QuestionSection
          pergunta={perguntas[sectionIndex]}
          sectionIndex={sectionIndex}
          respostas={respostas}
          onRespostaChange={updateResposta}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      );
    }
    
    // Página final
    return (
      <FinalSection
        onPrevious={prevPage}
        onSubmit={handleSubmit}
      />
    );
  };

  return (
    <div style={{ 
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      background: '#1A0F0A',
      color: '#FFFFFF',
      lineHeight: 1.6,
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Header />
      
      <main className="max-w-4xl mx-auto mt-8 px-5">
        <ProgressBar currentPage={currentPage} totalPages={totalPages} />
        
        <div className="animate-in fade-in duration-400">
          {renderCurrentPage()}
        </div>
      </main>

      <LoadingOverlay isVisible={isSubmitting} />
    </div>
  );
}

export default App;