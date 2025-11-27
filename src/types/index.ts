// tipos e interfaces da aplicação

// Interfaces para configurações dinâmicas
export interface Medida {
  id: string;
  nome: string;
  sigla: string;
  ativa: boolean;
  dataCriacao: Date;
}

export interface TipoProduto {
  id: string;
  nome: string;
  descricao?: string;
  ativa: boolean;
  dataCriacao: Date;
}

export interface Embalagem {
  id: string;
  quantidade: number;
  descricao: string;
  ativa: boolean;
  dataCriacao: Date;
}

// Interface principal do produto
export interface Produto {
  id: string;
  nome: string;
  embalagemId: string;
  medidaId: string;
  tipoProdutoId: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface FormProduto {
  nome: string;
  embalagemId: string;
  medidaId: string;
  tipoProdutoId: string;
}

// Interface para dados completos do produto (com relacionamentos)
export interface ProdutoCompleto extends Produto {
  embalagem: Embalagem;
  medida: Medida;
  tipoProduto: TipoProduto;
}

// Estado global da aplicação
export interface AppState {
  ano: number;
  mes: string;
  produtos: Produto[];
  medidas: Medida[];
  tiposProduto: TipoProduto[];
  embalagens: Embalagem[];
  isLoading: boolean;
  error: string | null;
}

export interface AppContextType {
  state: AppState;
  // Ano e Mês
  setAno: (ano: number) => void;
  setMes: (mes: string) => void;
  // Produtos
  addProduto: (
    produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>
  ) => void;
  updateProduto: (id: string, produto: Partial<Produto>) => void;
  deleteProduto: (id: string) => void;
  getProdutoCompleto: (id: string) => ProdutoCompleto | null;
  // Medidas
  addMedida: (medida: Omit<Medida, 'id' | 'dataCriacao'>) => void;
  updateMedida: (id: string, medida: Partial<Medida>) => void;
  deleteMedida: (id: string) => void;
  // Tipos de Produto
  addTipoProduto: (
    tipoProduto: Omit<TipoProduto, 'id' | 'dataCriacao'>
  ) => void;
  updateTipoProduto: (id: string, tipoProduto: Partial<TipoProduto>) => void;
  deleteTipoProduto: (id: string) => void;
  // Embalagens
  addEmbalagem: (embalagem: Omit<Embalagem, 'id' | 'dataCriacao'>) => void;
  updateEmbalagem: (id: string, embalagem: Partial<Embalagem>) => void;
  deleteEmbalagem: (id: string) => void;
  // Utilitários
  clearError: () => void;
}

// Formulários para configurações
export interface FormMedida {
  nome: string;
  sigla: string;
  ativa: boolean;
}

export interface FormTipoProduto {
  nome: string;
  descricao: string;
  ativa: boolean;
}

export interface FormEmbalagem {
  quantidade: number | '';
  descricao: string;
  ativa: boolean;
}

// Tipos para opções de select
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
