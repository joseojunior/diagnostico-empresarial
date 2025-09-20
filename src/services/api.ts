import { WEBHOOK_URL, REDIRECT_URL, WAIT_TIME } from '../constants';
import { Payload } from '../types';

export async function sendDiagnostico(payload: Payload): Promise<void> {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Falha no envio');
  }

  // Aguardar antes de redirecionar
  setTimeout(() => {
    window.location.href = REDIRECT_URL;
  }, WAIT_TIME);
}