import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from 'react-bootstrap';

import { Header } from '../components/common';
import { useApp } from '../context';
import { FormProduto } from '../types';

const Escreva: React.FC = () => {
  const { state, addProduto, clearError, getProdutoCompleto } = useApp();

  const [formData, setFormData] = useState<FormProduto>({
    nome: '',
    valor: '',
    quantidade: '',
    embalagemId: '',
    medidaId: '',
    tipoProdutoId: '',
  });

  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      valor: '',
      quantidade: '',
      embalagemId: '',
      medidaId: '',
      tipoProdutoId: '',
    });
    setValidated(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (
      form.checkValidity() &&
      formData.valor !== '' &&
      formData.quantidade !== '' &&
      formData.embalagemId &&
      formData.medidaId &&
      formData.tipoProdutoId
    ) {
      // Converte os dados do formulário para o formato do Produto
      const produtoData = {
        nome: formData.nome,
        valor: Number(formData.valor),
        quantidade: Number(formData.quantidade),
        embalagemId: formData.embalagemId,
        medidaId: formData.medidaId,
        tipoProdutoId: formData.tipoProdutoId,
      };

      addProduto(produtoData);
      setShowSuccess(true);
      resetForm();

      // Esconde a mensagem de sucesso após 3 segundos
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setValidated(true);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        {/* Mensagens de feedback */}
        {showSuccess && (
          <Row className="justify-content-center mb-3">
            <Col lg={8} xl={6}>
              <Alert
                variant="success"
                dismissible
                onClose={() => setShowSuccess(false)}
              >
                ✅ Produto cadastrado com sucesso!
              </Alert>
            </Col>
          </Row>
        )}

        {state.error && (
          <Row className="justify-content-center mb-3">
            <Col lg={8} xl={6}>
              <Alert variant="danger" dismissible onClose={clearError}>
                ❌ {state.error}
              </Alert>
            </Col>
          </Row>
        )}

        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <Card>
              <Card.Header>
                <h4 className="mb-0">Cadastro de Produto</h4>
                <small className="text-muted">
                  Total de produtos: {state.produtos.length}
                </small>
              </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nome do Produto *</Form.Label>
                        <Form.Control
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="Digite o nome do produto"
                          required
                          minLength={2}
                          disabled={state.isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor, informe um nome válido (mín. 2 caracteres).
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Valor (R$) *</Form.Label>
                        <Form.Control
                          type="number"
                          name="valor"
                          value={formData.valor}
                          onChange={handleInputChange}
                          placeholder="0,00"
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
                      <Form.Group className="mb-3">
                        <Form.Label>Quantidade *</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantidade"
                          value={formData.quantidade}
                          onChange={handleInputChange}
                          placeholder="0"
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
                      <Form.Group className="mb-3">
                        <Form.Label>Embalagem *</Form.Label>
                        <Form.Select
                          name="embalagemId"
                          value={formData.embalagemId}
                          onChange={handleInputChange}
                          required
                          disabled={state.isLoading}
                        >
                          <option value="">Selecione uma embalagem</option>
                          {state.embalagens
                            .filter(e => e.ativa)
                            .map(embalagem => (
                              <option key={embalagem.id} value={embalagem.id}>
                                {embalagem.descricao}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Medida *</Form.Label>
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
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tipo de Produto *</Form.Label>
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
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr />

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={resetForm}
                      disabled={state.isLoading}
                    >
                      Limpar
                    </Button>

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={state.isLoading}
                    >
                      {state.isLoading ? 'Cadastrando...' : 'Cadastrar Produto'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Preview dos dados */}
        {(formData.nome || formData.valor || formData.quantidade) && (
          <Row className="justify-content-center mt-4">
            <Col lg={8} xl={6}>
              <Card className="bg-light">
                <Card.Header>
                  <h6 className="mb-0">Preview dos Dados</h6>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col sm={6}>
                      <strong>Nome:</strong> {formData.nome || '-'}
                    </Col>
                    <Col sm={6}>
                      <strong>Valor:</strong> R$ {formData.valor || '0,00'}
                    </Col>
                    <Col sm={6}>
                      <strong>Quantidade:</strong> {formData.quantidade || 0}
                    </Col>
                    <Col sm={6}>
                      <strong>Embalagem:</strong>{' '}
                      {formData.embalagemId
                        ? state.embalagens.find(
                          e => e.id === formData.embalagemId,
                        )?.descricao || '-'
                        : '-'}
                    </Col>
                    <Col sm={6}>
                      <strong>Medida:</strong>{' '}
                      {formData.medidaId
                        ? state.medidas.find(m => m.id === formData.medidaId)
                          ?.nome || '-'
                        : '-'}
                    </Col>
                    <Col sm={6}>
                      <strong>Tipo:</strong>{' '}
                      {formData.tipoProdutoId
                        ? state.tiposProduto.find(
                          t => t.id === formData.tipoProdutoId,
                        )?.nome || '-'
                        : '-'}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Lista de produtos cadastrados */}
        {state.produtos.length > 0 && (
          <Row className="justify-content-center mt-4">
            <Col lg={8} xl={6}>
              <Card>
                <Card.Header>
                  <h6 className="mb-0">
                    Produtos Cadastrados ({state.produtos.length})
                  </h6>
                </Card.Header>
                <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {state.produtos.map(produto => {
                    const produtoCompleto = getProdutoCompleto(produto.id);
                    if (!produtoCompleto) {
                      return null;
                    }

                    return (
                      <div key={produto.id} className="border-bottom pb-2 mb-2">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <strong>{produto.nome}</strong>
                            <br />
                            <small className="text-muted">
                              R$ {produto.valor.toFixed(2)} •{' '}
                              {produto.quantidade}{' '}
                              {produtoCompleto.medida.sigla} •{' '}
                              {produtoCompleto.embalagem.descricao} •{' '}
                              {produtoCompleto.tipoProduto.nome}
                            </small>
                          </div>
                          <small className="text-muted">
                            {produto.dataCriacao.toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Escreva;
