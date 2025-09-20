export interface Contato {
  nome: string;
  email: string;
  telefone: string;
}

export interface Respostas {
  [key: string]: string;
}

export interface Draft {
  contato: Contato;
  respostas: Respostas;
}

export interface UTMs {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
}

export interface Pergunta {
  titulo: string;
  qs: string[];
}

export interface Payload extends Draft {
  utms: UTMs;
}