import React, { useState, useMemo } from 'react';
import { Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap';

import { useApp } from '../../context';
import ModalCadastroProduto from '../modal/cadastro.produto';
import './lancamentoMercado.css';

interface LancamentoMercadoProps {
  onSubmit?: (data: any) => void;
}

const LancamentoMercado: React.FC<LancamentoMercadoProps> = ({ onSubmit }) => {
  const { state } = useApp();

  const [formData, setFormData] = useState({
    nome: '',
    valor: '',
    quantidade: '',
    medidaId: '',
    tipoProdutoId: '',
  });

  const [validated, setValidated] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCadastroModal, setShowCadastroModal] = useState(false);

  // Filtra produtos existentes baseado no nome digitado
  const suggestedProducts = useMemo(() => {
    if (formData.nome.length < 2) {
      return [];
    }
    return state.produtos.filter(produto =>
      produto.nome.toLowerCase().includes(formData.nome.toLowerCase())
    );
  }, [formData.nome, state.produtos]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));

    // Mostra sugestões quando o usuário digita no campo nome
    if (name === 'nome') {
      setShowSuggestions(value.length >= 2);
    }
  };

  const handleSelectSuggestion = (produtoId: string) => {
    const produto = state.produtoLancamentos.find(p => p.id === produtoId);
    if (produto) {
      setFormData({
        nome: produto.nome,
        valor: produto.valor.toString(),
        quantidade: produto.quantidade.toString(),
        medidaId: produto.medidaId,
        tipoProdutoId: produto.tipoProdutoId,
      });
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity() && formData.medidaId && formData.tipoProdutoId) {
      const lancamentoData = {
        nome: formData.nome,
        medidaId: formData.medidaId,
        tipoProdutoId: formData.tipoProdutoId,
      };

      if (onSubmit) {
        onSubmit(lancamentoData);
      }

      // Limpa o formulário
      setFormData({
        nome: '',
        quantidade: '',
        valor: '',
        medidaId: '',
        tipoProdutoId: '',
      });
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  // Funções do modal de cadastro
  const handleOpenCadastroModal = () => {
    setShowCadastroModal(true);
  };

  const handleCloseCadastroModal = () => {
    setShowCadastroModal(false);
  };

  const handleCadastroSucesso = (produtoId: string) => {
    // Quando um produto é cadastrado, atualiza o formulário com os dados dele
    const produto = state.produtoLancamentos.find(p => p.id === produtoId);
    if (produto) {
      setFormData({
        nome: produto.nome,
        medidaId: produto.medidaId,
        quantidade: produto.quantidade.toString(),
        valor: produto.valor.toString(),
        tipoProdutoId: produto.tipoProdutoId,
      });
    }
  };

  return (
    <>
      <Card className="lancamento-mercado-container">
        <Card.Header>
          <h5 className="mb-0">Lançamento de Mercado</h5>
        </Card.Header>
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            autoComplete="off"
            data-testid="lancamento-form"
          >
            <Row>
              <Col md={12}>
                <Form.Group controlId="nome" className="mb-3 position-relative">
                  <Form.Label>Nome do Produto</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    onFocus={() =>
                      setShowSuggestions(
                        formData.nome.length >= 2 &&
                          suggestedProducts.length > 0
                      )
                    }
                    onBlur={() => {
                      // Delay para permitir o clique na sugestão
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    placeholder="Digite o nome do produto"
                    required
                    minLength={2}
                    disabled={state.isLoading}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, informe um nome válido (mín. 2 caracteres).
                  </Form.Control.Feedback>

                  {/* Lista de sugestões */}
                  {showSuggestions && suggestedProducts.length > 0 && (
                    <ListGroup
                      className="position-absolute w-100 shadow-sm"
                      style={{
                        zIndex: 1000,
                        maxHeight: '200px',
                        overflowY: 'auto',
                      }}
                    >
                      {suggestedProducts.map(produto => (
                        <ListGroup.Item
                          key={produto.id}
                          action
                          onClick={() => handleSelectSuggestion(produto.id)}
                          style={{ cursor: 'pointer' }}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <strong>{produto.nome}</strong>
                          <small className="text-muted">
                            {
                              state.medidas.find(m => m.id === produto.medidaId)
                                ?.sigla
                            }{' '}
                            •{' '}
                            {
                              state.tiposProduto.find(
                                t => t.id === produto.tipoProdutoId
                              )?.nome
                            }
                          </small>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Form.Group>

                <div className="mb-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleOpenCadastroModal}
                  >
                    + Cadastrar Novo Produto
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="valor" className="mb-3">
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    type="number"
                    name="valor"
                    value={formData.valor}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                    disabled={state.isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, informe um valor válido.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="quantidade" className="mb-3">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleInputChange}
                    placeholder="0"
                    step="1"
                    min="1"
                    required
                    disabled={state.isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, informe uma quantidade válida.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group controlId="medidaId" className="mb-3">
                  <Form.Label>Medida</Form.Label>
                  <Form.Select
                    name="medidaId"
                    value={formData.medidaId}
                    onChange={handleInputChange}
                    required
                    disabled={state.isLoading}
                  >
                    <option value="">Selecione uma medida</option>
                    {state.medidas
                      .filter(m => m.ativa)
                      .map(medida => (
                        <option key={medida.id} value={medida.id}>
                          {medida.nome} ({medida.sigla})
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor, selecione uma medida.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="tipoProdutoId" className="mb-3">
                  <Form.Label>Tipo de Produto</Form.Label>
                  <Form.Select
                    name="tipoProdutoId"
                    value={formData.tipoProdutoId}
                    onChange={handleInputChange}
                    required
                    disabled={state.isLoading}
                  >
                    <option value="">Selecione um tipo</option>
                    {state.tiposProduto
                      .filter(t => t.ativa)
                      .map(tipo => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nome}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor, selecione um tipo.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <hr />

            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                type="submit"
                disabled={state.isLoading}
              >
                {state.isLoading ? 'Processando...' : 'Adicionar Lançamento'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Modal de Cadastro Completo */}
      <ModalCadastroProduto
        show={showCadastroModal}
        onHide={handleCloseCadastroModal}
        nomeInicial={formData.nome}
        onCadastroSucesso={handleCadastroSucesso}
      />
    </>
  );
};

export default LancamentoMercado;
