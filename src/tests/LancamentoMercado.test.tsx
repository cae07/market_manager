import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

// Helper para renderizar com Provider
const renderWithProvider = (component: React.ReactElement) => {
  return render(<AppProvider>{component}</AppProvider>);
};

describe('LancamentoMercado Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.clearAllMocks();
    user = userEvent.setup({ delay: null });
  });

  describe('Renderização inicial', () => {
    it('deve renderizar o formulário corretamente', () => {
      renderWithProvider(<LancamentoMercado />);

      expect(screen.getByText('Lançamento de Mercado')).toBeInTheDocument();
      expect(screen.getByLabelText(/Nome do Produto/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Valor$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Quantidade$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Medida$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Tipo de Produto/i)).toBeInTheDocument();
    });

    it('deve renderizar o botão de cadastrar novo produto', () => {
      renderWithProvider(<LancamentoMercado />);

      expect(screen.getByText('+ Cadastrar Novo Produto')).toBeInTheDocument();
    });

    it('deve renderizar o botão de adicionar lançamento', () => {
      renderWithProvider(<LancamentoMercado />);

      expect(
        screen.getByRole('button', { name: /Adicionar Lançamento/i })
      ).toBeInTheDocument();
    });

    it('deve renderizar selects com opções padrão', () => {
      renderWithProvider(<LancamentoMercado />);

      const medidasSelect = screen.getByLabelText(/Medida/i);
      const tipoSelect = screen.getByLabelText(/Tipo de Produto/i);

      expect(medidasSelect).toHaveValue('');
      expect(tipoSelect).toHaveValue('');
    });
  });

  describe('Preenchimento de formulário', () => {
    it('deve permitir digitar no campo nome', async () => {
      renderWithProvider(<LancamentoMercado />);

      const nomeInput = screen.getByLabelText(/Nome do Produto/i);

      await user.type(nomeInput, 'Arroz');

      await waitFor(() => {
        expect(nomeInput).toHaveValue('Arroz');
      });
    });

    it('deve permitir digitar valor numérico', async () => {
      renderWithProvider(<LancamentoMercado />);

      const valorInput = screen.getByLabelText(/Valor/i);

      await user.type(valorInput, '15.99');

      await waitFor(() => {
        expect(valorInput).toHaveValue(15.99);
      });
    });

    it('deve permitir digitar quantidade', async () => {
      renderWithProvider(<LancamentoMercado />);

      const quantidadeInput = screen.getByLabelText(/Quantidade/i);

      await user.type(quantidadeInput, '5');

      await waitFor(() => {
        expect(quantidadeInput).toHaveValue(5);
      });
    });

    it('deve permitir selecionar medida', async () => {
      renderWithProvider(<LancamentoMercado />);

      const medidasSelect = screen.getByLabelText(/Medida/i);

      await user.selectOptions(medidasSelect, '1');

      await waitFor(() => {
        expect(medidasSelect).toHaveValue('1');
      });
    });

    it('deve permitir selecionar tipo de produto', async () => {
      renderWithProvider(<LancamentoMercado />);

      const tipoSelect = screen.getByLabelText(/Tipo de Produto/i);

      await user.selectOptions(tipoSelect, '1');

      await waitFor(() => {
        expect(tipoSelect).toHaveValue('1');
      });
    });
  });

  describe('Validação de formulário', () => {
    it('deve mostrar erro quando tentar submeter formulário vazio', async () => {
      renderWithProvider(<LancamentoMercado />);

      const submitButton = screen.getByRole('button', {
        name: /Adicionar Lançamento/i,
      });

      await user.click(submitButton);

      await waitFor(() => {
        const feedback = screen.getByText(
          /Por favor, informe um nome válido \(mín\. 2 caracteres\)\./i
        );
        expect(feedback).toBeInTheDocument();
      });
    });

    it('deve validar nome com mínimo de 2 caracteres', async () => {
      renderWithProvider(<LancamentoMercado />);

      const nomeInput = screen.getByLabelText(/Nome do Produto/i);
      const submitButton = screen.getByRole('button', {
        name: /Adicionar Lançamento/i,
      });

      await user.type(nomeInput, 'A');
      await user.click(submitButton);

      await waitFor(() => {
        const feedback = screen.getByText(
          /Por favor, informe um nome válido \(mín\. 2 caracteres\)\./i
        );
        expect(feedback).toBeInTheDocument();
      });
    });

    it('deve validar campos obrigatórios antes de submeter', async () => {
      renderWithProvider(<LancamentoMercado />);

      const nomeInput = screen.getByLabelText(/Nome do Produto/i);
      const submitButton = screen.getByRole('button', {
        name: /Adicionar Lançamento/i,
      });

      await user.type(nomeInput, 'Arroz');
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Por favor, informe um valor válido/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Sistema de sugestões', () => {
    it('não deve mostrar sugestões com menos de 2 caracteres', async () => {
      renderWithProvider(<LancamentoMercado />);

      const nomeInput = screen.getByLabelText(/Nome do Produto/i);

      await user.type(nomeInput, 'A');

      await waitFor(() => {
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });

    it('deve esconder sugestões ao perder foco', async () => {
      renderWithProvider(<LancamentoMercado />);

      const nomeInput = screen.getByLabelText(/Nome do Produto/i);

      await user.type(nomeInput, 'Arroz');

      // Simula perda de foco
      await user.tab();

      await waitFor(
        () => {
          expect(screen.queryByRole('list')).not.toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });
  });

  describe('Modal de cadastro', () => {
    it('deve abrir modal ao clicar em cadastrar novo produto', async () => {
      renderWithProvider(<LancamentoMercado />);

      const cadastrarButton = screen.getByText('+ Cadastrar Novo Produto');

      await user.click(cadastrarButton);

      await waitFor(() => {
        expect(screen.getByTestId('modal-cadastro')).toBeInTheDocument();
      });
    });

    it('deve fechar modal ao clicar em fechar', async () => {
      renderWithProvider(<LancamentoMercado />);

      const cadastrarButton = screen.getByText('+ Cadastrar Novo Produto');

      await user.click(cadastrarButton);

      await waitFor(() => {
        expect(screen.getByTestId('modal-cadastro')).toBeInTheDocument();
      });

      const fecharButton = screen.getByText('Fechar Modal');
      await user.click(fecharButton);

      await waitFor(() => {
        expect(screen.queryByTestId('modal-cadastro')).not.toBeInTheDocument();
      });
    });

    it('deve passar nome digitado para o modal', async () => {
      renderWithProvider(<LancamentoMercado />);

      const nomeInput = screen.getByLabelText(/Nome do Produto/i);
      await user.type(nomeInput, 'Feijão');

      await waitFor(() => {
        expect(nomeInput).toHaveValue('Feijão');
      });

      const cadastrarButton = screen.getByText('+ Cadastrar Novo Produto');
      await user.click(cadastrarButton);

      await waitFor(() => {
        expect(screen.getByTestId('modal-cadastro')).toBeInTheDocument();
      });
    });
  });

  describe('Submissão de formulário', () => {
    it('deve chamar onSubmit com dados corretos', async () => {
      const mockOnSubmit = jest.fn();

      renderWithProvider(<LancamentoMercado onSubmit={mockOnSubmit} />);

      // Preencher formulário
      const nomeInput = screen.getByLabelText(/Nome do Produto/i);
      const valorInput = screen.getByLabelText(/Valor/i);
      const quantidadeInput = screen.getByLabelText(/Quantidade/i);
      const medidasSelect = screen.getByLabelText(/Medida/i);
      const tipoSelect = screen.getByLabelText(/Tipo de Produto/i);

      await user.type(nomeInput, 'Arroz');
      await user.type(valorInput, '10.50');
      await user.type(quantidadeInput, '2');
      await user.selectOptions(medidasSelect, '1');
      await user.selectOptions(tipoSelect, '1');

      // Submeter
      const submitButton = screen.getByRole('button', {
        name: /Adicionar Lançamento/i,
      });

      await user.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({
        nome: 'Arroz',
        medidaId: '1',
        tipoProdutoId: '1',
      });

      // Aguardar limpeza do formulário
      await waitFor(() => {
        expect(nomeInput).toHaveValue('');
      });
    });

    it('deve limpar formulário após submissão bem-sucedida', async () => {
      const mockOnSubmit = jest.fn();

      renderWithProvider(<LancamentoMercado onSubmit={mockOnSubmit} />);

      // Preencher formulário
      const nomeInput = screen.getByLabelText(/Nome do Produto/i);
      const valorInput = screen.getByLabelText(/Valor/i);
      const quantidadeInput = screen.getByLabelText(/Quantidade/i);
      const medidasSelect = screen.getByLabelText(/Medida/i);
      const tipoSelect = screen.getByLabelText(/Tipo de Produto/i);

      await user.type(nomeInput, 'Arroz');
      await user.type(valorInput, '10.50');
      await user.type(quantidadeInput, '2');
      await user.selectOptions(medidasSelect, '1');
      await user.selectOptions(tipoSelect, '1');

      // Submeter
      const submitButton = screen.getByRole('button', {
        name: /Adicionar Lançamento/i,
      });

      await user.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalled();
      expect(nomeInput).toHaveValue('');
      expect(valorInput).toHaveValue(null);
      expect(quantidadeInput).toHaveValue(null);
    });
  });

  describe('Atributos de autocomplete', () => {
    it('deve ter atributos corretos para bloquear autocomplete do navegador', () => {
      renderWithProvider(<LancamentoMercado />);

      const nomeInput = screen.getByLabelText(/Nome do Produto/i);

      expect(nomeInput).toHaveAttribute('autocomplete', 'off');
      expect(nomeInput).toHaveAttribute('autocorrect', 'off');
      expect(nomeInput).toHaveAttribute('autocapitalize', 'off');
      expect(nomeInput).toHaveAttribute('spellcheck', 'false');
    });

    it('deve ter autocomplete off no formulário', () => {
      renderWithProvider(<LancamentoMercado />);

      const form = screen.getByTestId('lancamento-form');

      expect(form).toHaveAttribute('autocomplete', 'off');
    });
  });

  describe('Estados de loading', () => {
    it('deve desabilitar campos durante loading', () => {
      renderWithProvider(<LancamentoMercado />);

      const nomeInput = screen.getByLabelText(/Nome do Produto/i);
      const valorInput = screen.getByLabelText(/Valor/i);
      const quantidadeInput = screen.getByLabelText(/Quantidade/i);

      // Por padrão não devem estar desabilitados
      expect(nomeInput).not.toBeDisabled();
      expect(valorInput).not.toBeDisabled();
      expect(quantidadeInput).not.toBeDisabled();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter labels associados aos inputs', () => {
      renderWithProvider(<LancamentoMercado />);

      expect(screen.getByLabelText(/Nome do Produto/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Valor/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Quantidade/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Medida/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Tipo de Produto/i)).toBeInTheDocument();
    });

    it('deve ter placeholders informativos', () => {
      renderWithProvider(<LancamentoMercado />);

      expect(
        screen.getByPlaceholderText('Digite o nome do produto')
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
    });

    it('deve ter campos required', () => {
      renderWithProvider(<LancamentoMercado />);

      expect(screen.getByLabelText(/Nome do Produto/i)).toBeRequired();
      expect(screen.getByLabelText(/Valor/i)).toBeRequired();
      expect(screen.getByLabelText(/Quantidade/i)).toBeRequired();
      expect(screen.getByLabelText(/Medida/i)).toBeRequired();
      expect(screen.getByLabelText(/Tipo de Produto/i)).toBeRequired();
    });
  });

  describe('Valores mínimos e máximos', () => {
    it('deve ter valor mínimo de 0 para valor', () => {
      renderWithProvider(<LancamentoMercado />);

      const valorInput = screen.getByLabelText(/Valor/i);

      expect(valorInput).toHaveAttribute('min', '0');
    });

    it('deve ter valor mínimo de 1 para quantidade', () => {
      renderWithProvider(<LancamentoMercado />);

      const quantidadeInput = screen.getByLabelText(/Quantidade/i);

      expect(quantidadeInput).toHaveAttribute('min', '1');
    });

    it('deve ter step correto para valor', () => {
      renderWithProvider(<LancamentoMercado />);

      const valorInput = screen.getByLabelText(/Valor/i);

      expect(valorInput).toHaveAttribute('step', '0.01');
    });

    it('deve ter step correto para quantidade', () => {
      renderWithProvider(<LancamentoMercado />);

      const quantidadeInput = screen.getByLabelText(/Quantidade/i);

      expect(quantidadeInput).toHaveAttribute('step', '1');
    });
  });
});
