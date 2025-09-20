import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center flex-col text-white text-lg z-50">
      <div className="w-10 h-10 border-4 border-white border-opacity-30 border-t-orange-600 rounded-full animate-spin"></div>
      <p className="mt-4">Enviando respostas, aguarde...</p>
    </div>
  );
}