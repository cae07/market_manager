import { render } from '@testing-library/react';
import React from 'react';

import LancamentoMercado from '../components/forms/lancamento.mercado';
import { AppProvider } from '../context';

// Mock do modal para evitar problemas de renderização
jest.mock('../components/modal/cadastro.produto', () => {
  return function MockModalCadastroProduto({
    show,
    onHide,
  }: {
    show: boolean;
    onHide: () => void;
  }) {
    if (!show) {
      return null;
    }
    return (
      <div data-testid="modal-cadastro">
        <button onClick={onHide}>Fechar Modal</button>
      </div>
    );
  };
});

describe('LancamentoMercado - Snapshot Tests', () => {
  it('deve corresponder ao snapshot com formulário vazio', () => {
    const { container } = render(
      <AppProvider>
        <LancamentoMercado />
      </AppProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('deve corresponder ao snapshot com prop onSubmit', () => {
    const mockOnSubmit = jest.fn();

    const { container } = render(
      <AppProvider>
        <LancamentoMercado onSubmit={mockOnSubmit} />
      </AppProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
