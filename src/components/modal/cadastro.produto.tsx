import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';

import { FormProduto, useApp } from '../../context';

interface ModalCadastroProdutoProps {
  show: boolean;
  onHide: () => void;
  nomeInicial?: string;
  onCadastroSucesso?: (produtoId: string) => void;
}

const ModalCadastroProduto: React.FC<ModalCadastroProdutoProps> = ({
  show,
  onHide,
  nomeInicial = '',
  onCadastroSucesso,
}) => {
  const { state, addProduto } = useApp();

  const [cadastroValidated, setCadastroValidated] = useState(false);
  const [cadastroFormData, setCadastroFormData] = useState<FormProduto>({
    nome: nomeInicial,
    embalagemId: '',
    medidaId: '',
    tipoProdutoId: '',
  });

  // Atualiza o nome inicial quando a prop muda
  React.useEffect(() => {
    setCadastroFormData(prev => ({
      ...prev,
      nome: nomeInicial,
    }));
  }, [nomeInicial]);

  const handleCloseCadastroModal = () => {
    setCadastroFormData({
      nome: '',
      embalagemId: '',
      medidaId: '',
      tipoProdutoId: '',
    });
    setCadastroValidated(false);
    onHide();
  };

  const handleCadastroSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (
      form.checkValidity() &&
      cadastroFormData.embalagemId &&
      cadastroFormData.medidaId &&
      cadastroFormData.tipoProdutoId
    ) {
      const produtoData = {
        nome: cadastroFormData.nome,
        embalagemId: cadastroFormData.embalagemId,
        medidaId: cadastroFormData.medidaId,
        tipoProdutoId: cadastroFormData.tipoProdutoId,
      };

      addProduto(produtoData);

      // Notifica o componente pai sobre o sucesso
      if (onCadastroSucesso) {
        // Encontra o ID do produto recém-criado (último da lista)
        const ultimoProduto = state.produtos[state.produtos.length - 1];
        onCadastroSucesso(ultimoProduto?.id || '');
      }

      handleCloseCadastroModal();
    } else {
      setCadastroValidated(true);
    }
  };

  const handleCadastroInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setCadastroFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  return (
    <Modal show={show} onHide={handleCloseCadastroModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Novo Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={cadastroValidated}
          onSubmit={handleCadastroSubmit}
          id="cadastro-produto-form"
        >
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Produto</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={cadastroFormData.nome}
                  onChange={handleCadastroInputChange}
                  placeholder="Digite o nome do produto"
                  required
                  minLength={2}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe um nome válido (mín. 2 caracteres).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Embalagem</Form.Label>
                <Form.Select
                  name="embalagemId"
                  value={cadastroFormData.embalagemId}
                  onChange={handleCadastroInputChange}
                  required
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
                <Form.Control.Feedback type="invalid">
                  Por favor, selecione uma embalagem.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Medida</Form.Label>
                <Form.Select
                  name="medidaId"
                  value={cadastroFormData.medidaId}
                  onChange={handleCadastroInputChange}
                  required
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
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Produto</Form.Label>
                <Form.Select
                  name="tipoProdutoId"
                  value={cadastroFormData.tipoProdutoId}
                  onChange={handleCadastroInputChange}
                  required
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCadastroModal}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" form="cadastro-produto-form">
          Cadastrar Produto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCadastroProduto;
