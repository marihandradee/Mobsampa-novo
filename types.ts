export type Regiao = 'Leste' | 'Norte' | 'Oeste' | 'Sul' | 'Centro';
export type TipoImovel = 'Casa' | 'Apartamento';
export type Modalidade = 'Venda' | 'Locação';

export interface Imovel {
  id: string;
  tipo: TipoImovel;
  modalidade: Modalidade;
  valor: number;
  metros_quadrados: number;
  regiao: Regiao;
  has_onibus: boolean;
  has_mercado: boolean;
  has_metro: boolean;
  condominio: number;
  foto_url: string;
  descricao: string;
  created_at?: string;
}

export interface ImovelFormData {
  tipo: TipoImovel;
  modalidade: Modalidade;
  valor: number;
  metros_quadrados: number;
  regiao: Regiao;
  has_onibus: boolean;
  has_mercado: boolean;
  has_metro: boolean;
  condominio: number;
  foto_url: string;
  descricao: string;
}
