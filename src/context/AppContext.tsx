import React, { createContext, useContext, useReducer, ReactNode } from 'react';

import {
  AppState,
  AppContextType,
  Produto,
  Medida,
  TipoProduto,
  Embalagem,
  ProdutoCompleto,
} from '../types';

// Estado inicial com dados padrão
const initialState: AppState = {
  ano: 2025,
  mes: 'Novembro',
  produtos: [],
  medidas: [
    {
      id: '1',
      nome: 'Quilogramas',
      sigla: 'kg',
      ativa: true,
      dataCriacao: new Date(),
    },
    {
      id: '2',
      nome: 'Gramas',
      sigla: 'g',
      ativa: true,
      dataCriacao: new Date(),
    },
  ],
  tiposProduto: [
    {
      id: '1',
      nome: 'Alimentos Gerais',
      descricao: 'Produtos alimentícios diversos',
      ativa: true,
      dataCriacao: new Date(),
    },
    {
      id: '2',
      nome: 'Açougue',
      descricao: 'Carnes e derivados',
      ativa: true,
      dataCriacao: new Date(),
    },
  ],
  embalagens: [
    {
      id: '1',
      quantidade: 1,
      descricao: '1 unidade',
      ativa: true,
      dataCriacao: new Date(),
    },
    {
      id: '2',
      quantidade: 5,
      descricao: '5 unidades',
      ativa: true,
      dataCriacao: new Date(),
    },
  ],
  isLoading: false,
  error: null,
};

// Actions
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ANO'; payload: number }
  | { type: 'SET_MES'; payload: string }
  | { type: 'ADD_PRODUTO'; payload: Produto }
  | {
      type: 'UPDATE_PRODUTO';
      payload: { id: string; produto: Partial<Produto> };
    }
  | { type: 'DELETE_PRODUTO'; payload: string }
  | { type: 'ADD_MEDIDA'; payload: Medida }
  | { type: 'UPDATE_MEDIDA'; payload: { id: string; medida: Partial<Medida> } }
  | { type: 'DELETE_MEDIDA'; payload: string }
  | { type: 'ADD_TIPO_PRODUTO'; payload: TipoProduto }
  | {
      type: 'UPDATE_TIPO_PRODUTO';
      payload: { id: string; tipoProduto: Partial<TipoProduto> };
    }
  | { type: 'DELETE_TIPO_PRODUTO'; payload: string }
  | { type: 'ADD_EMBALAGEM'; payload: Embalagem }
  | {
      type: 'UPDATE_EMBALAGEM';
      payload: { id: string; embalagem: Partial<Embalagem> };
    }
  | { type: 'DELETE_EMBALAGEM'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'SET_ANO':
      return {
        ...state,
        ano: action.payload,
      };

    case 'SET_MES':
      return {
        ...state,
        mes: action.payload,
      };

    case 'ADD_PRODUTO':
      return {
        ...state,
        produtos: [...state.produtos, action.payload],
        error: null,
      };

    case 'UPDATE_PRODUTO': {
      const { id, produto } = action.payload;
      return {
        ...state,
        produtos: state.produtos.map(p =>
          p.id === id ? { ...p, ...produto, dataAtualizacao: new Date() } : p,
        ),
        error: null,
      };
    }

    case 'DELETE_PRODUTO':
      return {
        ...state,
        produtos: state.produtos.filter(p => p.id !== action.payload),
        error: null,
      };

    case 'ADD_MEDIDA':
      return {
        ...state,
        medidas: [...state.medidas, action.payload],
        error: null,
      };

    case 'UPDATE_MEDIDA': {
      const { id, medida } = action.payload;
      return {
        ...state,
        medidas: state.medidas.map(m =>
          m.id === id ? { ...m, ...medida } : m,
        ),
        error: null,
      };
    }

    case 'DELETE_MEDIDA':
      return {
        ...state,
        medidas: state.medidas.filter(m => m.id !== action.payload),
        error: null,
      };

    case 'ADD_TIPO_PRODUTO':
      return {
        ...state,
        tiposProduto: [...state.tiposProduto, action.payload],
        error: null,
      };

    case 'UPDATE_TIPO_PRODUTO': {
      const { id, tipoProduto } = action.payload;
      return {
        ...state,
        tiposProduto: state.tiposProduto.map(t =>
          t.id === id ? { ...t, ...tipoProduto } : t,
        ),
        error: null,
      };
    }

    case 'DELETE_TIPO_PRODUTO':
      return {
        ...state,
        tiposProduto: state.tiposProduto.filter(t => t.id !== action.payload),
        error: null,
      };

    case 'ADD_EMBALAGEM':
      return {
        ...state,
        embalagens: [...state.embalagens, action.payload],
        error: null,
      };

    case 'UPDATE_EMBALAGEM': {
      const { id, embalagem } = action.payload;
      return {
        ...state,
        embalagens: state.embalagens.map(e =>
          e.id === id ? { ...e, ...embalagem } : e,
        ),
        error: null,
      };
    }

    case 'DELETE_EMBALAGEM':
      return {
        ...state,
        embalagens: state.embalagens.filter(e => e.id !== action.payload),
        error: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Função para gerar ID único
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Actions
  const addProduto = (
    produtoData: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>,
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const novoProduto: Produto = {
        ...produtoData,
        id: generateId(),
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
      };

      dispatch({ type: 'ADD_PRODUTO', payload: novoProduto });
      dispatch({ type: 'SET_LOADING', payload: false });

      // Aqui você pode adicionar lógica para salvar no localStorage ou API
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao adicionar produto' });
    }
  };

  const updateProduto = (id: string, produto: Partial<Produto>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'UPDATE_PRODUTO', payload: { id, produto } });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao atualizar produto' });
    }
  };

  const deleteProduto = (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'DELETE_PRODUTO', payload: id });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao remover produto' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const setAno = (ano: number) => {
    dispatch({ type: 'SET_ANO', payload: ano });
  };

  const setMes = (mes: string) => {
    dispatch({ type: 'SET_MES', payload: mes });
  };

  // Função para obter produto completo com relacionamentos
  const getProdutoCompleto = (id: string): ProdutoCompleto | null => {
    const produto = state.produtos.find(p => p.id === id);
    if (!produto) {
      return null;
    }

    const embalagem = state.embalagens.find(e => e.id === produto.embalagemId);
    const medida = state.medidas.find(m => m.id === produto.medidaId);
    const tipoProduto = state.tiposProduto.find(
      t => t.id === produto.tipoProdutoId,
    );

    if (!embalagem || !medida || !tipoProduto) {
      return null;
    }

    return {
      ...produto,
      embalagem,
      medida,
      tipoProduto,
    };
  };

  // Funções para Medidas
  const addMedida = (medidaData: Omit<Medida, 'id' | 'dataCriacao'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const novaMedida: Medida = {
        ...medidaData,
        id: generateId(),
        dataCriacao: new Date(),
      };

      dispatch({ type: 'ADD_MEDIDA', payload: novaMedida });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao adicionar medida' });
    }
  };

  const updateMedida = (id: string, medida: Partial<Medida>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'UPDATE_MEDIDA', payload: { id, medida } });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao atualizar medida' });
    }
  };

  const deleteMedida = (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'DELETE_MEDIDA', payload: id });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao remover medida' });
    }
  };

  // Funções para Tipos de Produto
  const addTipoProduto = (
    tipoProdutoData: Omit<TipoProduto, 'id' | 'dataCriacao'>,
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const novoTipoProduto: TipoProduto = {
        ...tipoProdutoData,
        id: generateId(),
        dataCriacao: new Date(),
      };

      dispatch({ type: 'ADD_TIPO_PRODUTO', payload: novoTipoProduto });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao adicionar tipo de produto',
      });
    }
  };

  const updateTipoProduto = (id: string, tipoProduto: Partial<TipoProduto>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'UPDATE_TIPO_PRODUTO', payload: { id, tipoProduto } });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao atualizar tipo de produto',
      });
    }
  };

  const deleteTipoProduto = (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'DELETE_TIPO_PRODUTO', payload: id });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao remover tipo de produto',
      });
    }
  };

  // Funções para Embalagens
  const addEmbalagem = (
    embalagemData: Omit<Embalagem, 'id' | 'dataCriacao'>,
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const novaEmbalagem: Embalagem = {
        ...embalagemData,
        id: generateId(),
        dataCriacao: new Date(),
      };

      dispatch({ type: 'ADD_EMBALAGEM', payload: novaEmbalagem });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao adicionar embalagem' });
    }
  };

  const updateEmbalagem = (id: string, embalagem: Partial<Embalagem>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'UPDATE_EMBALAGEM', payload: { id, embalagem } });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao atualizar embalagem' });
    }
  };

  const deleteEmbalagem = (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'DELETE_EMBALAGEM', payload: id });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao remover embalagem' });
    }
  };

  const contextValue: AppContextType = {
    state,
    setAno,
    setMes,
    addProduto,
    updateProduto,
    deleteProduto,
    getProdutoCompleto,
    addMedida,
    updateMedida,
    deleteMedida,
    addTipoProduto,
    updateTipoProduto,
    deleteTipoProduto,
    addEmbalagem,
    updateEmbalagem,
    deleteEmbalagem,
    clearError,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Hook personalizado
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};
