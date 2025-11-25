import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Alert,
  Badge,
  Tabs,
  Tab,
} from 'react-bootstrap';

import { Header } from '../components/common';
import { useApp } from '../context';
import { Medida, TipoProduto, Embalagem } from '../types';

const Configuracoes: React.FC = () => {
  const {
    state,
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
  } = useApp();

  // Estados para controlar modais
  const [showMedidaModal, setShowMedidaModal] = useState(false);
  const [showTipoModal, setShowTipoModal] = useState(false);
  const [showEmbalagemModal, setShowEmbalagemModal] = useState(false);

  // Estados para edição
  const [editingMedida, setEditingMedida] = useState<Medida | null>(null);
  const [editingTipo, setEditingTipo] = useState<TipoProduto | null>(null);
  const [editingEmbalagem, setEditingEmbalagem] = useState<Embalagem | null>(
    null,
  );

  // Estados para formulários
  const [formMedida, setFormMedida] = useState({
    nome: '',
    sigla: '',
    ativa: true,
  });

  const [formTipo, setFormTipo] = useState({
    nome: '',
    descricao: '',
    ativa: true,
  });

  const [formEmbalagem, setFormEmbalagem] = useState({
    quantidade: 1,
    descricao: '',
    ativa: true,
  });

  // Funções para Medidas
  const handleOpenMedidaModal = (medida?: Medida) => {
    if (medida) {
      setEditingMedida(medida);
      setFormMedida({
        nome: medida.nome,
        sigla: medida.sigla,
        ativa: medida.ativa,
      });
    } else {
      setEditingMedida(null);
      setFormMedida({ nome: '', sigla: '', ativa: true });
    }
    setShowMedidaModal(true);
  };

  const handleCloseMedidaModal = () => {
    setShowMedidaModal(false);
    setEditingMedida(null);
    setFormMedida({ nome: '', sigla: '', ativa: true });
  };

  const handleSaveMedida = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMedida) {
      updateMedida(editingMedida.id, formMedida);
    } else {
      addMedida(formMedida);
    }
    handleCloseMedidaModal();
  };

  const handleDeleteMedida = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta medida?')) {
      deleteMedida(id);
    }
  };

  // Funções para Tipos de Produto
  const handleOpenTipoModal = (tipo?: TipoProduto) => {
    if (tipo) {
      setEditingTipo(tipo);
      setFormTipo({
        nome: tipo.nome,
        descricao: tipo.descricao || '',
        ativa: tipo.ativa,
      });
    } else {
      setEditingTipo(null);
      setFormTipo({ nome: '', descricao: '', ativa: true });
    }
    setShowTipoModal(true);
  };

  const handleCloseTipoModal = () => {
    setShowTipoModal(false);
    setEditingTipo(null);
    setFormTipo({ nome: '', descricao: '', ativa: true });
  };

  const handleSaveTipo = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTipo) {
      updateTipoProduto(editingTipo.id, formTipo);
    } else {
      addTipoProduto(formTipo);
    }
    handleCloseTipoModal();
  };

  const handleDeleteTipo = (id: string) => {
    if (
      window.confirm('Tem certeza que deseja excluir este tipo de produto?')
    ) {
      deleteTipoProduto(id);
    }
  };

  // Funções para Embalagens
  const handleOpenEmbalagemModal = (embalagem?: Embalagem) => {
    if (embalagem) {
      setEditingEmbalagem(embalagem);
      setFormEmbalagem({
        quantidade: embalagem.quantidade,
        descricao: embalagem.descricao,
        ativa: embalagem.ativa,
      });
    } else {
      setEditingEmbalagem(null);
      setFormEmbalagem({ quantidade: 1, descricao: '', ativa: true });
    }
    setShowEmbalagemModal(true);
  };

  const handleCloseEmbalagemModal = () => {
    setShowEmbalagemModal(false);
    setEditingEmbalagem(null);
    setFormEmbalagem({ quantidade: 1, descricao: '', ativa: true });
  };

  const handleSaveEmbalagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmbalagem) {
      updateEmbalagem(editingEmbalagem.id, formEmbalagem);
    } else {
      addEmbalagem(formEmbalagem);
    }
    handleCloseEmbalagemModal();
  };

  const handleDeleteEmbalagem = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta embalagem?')) {
      deleteEmbalagem(id);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        {/* Mensagem de erro */}
        {state.error && (
          <Alert variant="danger" dismissible onClose={clearError}>
            ❌ {state.error}
          </Alert>
        )}

        <Row>
          <Col>
            <h2>Configurações do Sistema</h2>
            <p className="text-muted">
              Gerencie as configurações de medidas, tipos de produto e
              embalagens.
            </p>
          </Col>
        </Row>

        <Tabs defaultActiveKey="medidas" id="config-tabs" className="mb-3">
          {/* Tab de Medidas */}
          <Tab eventKey="medidas" title="Medidas">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Medidas</h5>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenMedidaModal()}
                >
                  + Nova Medida
                </Button>
              </Card.Header>
              <Card.Body>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Sigla</th>
                      <th>Status</th>
                      <th>Data Criação</th>
                      <th style={{ width: '120px' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.medidas.map(medida => (
                      <tr key={medida.id}>
                        <td>{medida.nome}</td>
                        <td>
                          <code>{medida.sigla}</code>
                        </td>
                        <td>
                          <Badge bg={medida.ativa ? 'success' : 'secondary'}>
                            {medida.ativa ? 'Ativa' : 'Inativa'}
                          </Badge>
                        </td>
                        <td>{medida.dataCriacao.toLocaleDateString()}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                            onClick={() => handleOpenMedidaModal(medida)}
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteMedida(medida.id)}
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          {/* Tab de Tipos de Produto */}
          <Tab eventKey="tipos" title="Tipos de Produto">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Tipos de Produto</h5>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenTipoModal()}
                >
                  + Novo Tipo
                </Button>
              </Card.Header>
              <Card.Body>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Status</th>
                      <th>Data Criação</th>
                      <th style={{ width: '120px' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.tiposProduto.map(tipo => (
                      <tr key={tipo.id}>
                        <td>{tipo.nome}</td>
                        <td>{tipo.descricao}</td>
                        <td>
                          <Badge bg={tipo.ativa ? 'success' : 'secondary'}>
                            {tipo.ativa ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </td>
                        <td>{tipo.dataCriacao.toLocaleDateString()}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                            onClick={() => handleOpenTipoModal(tipo)}
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteTipo(tipo.id)}
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          {/* Tab de Embalagens */}
          <Tab eventKey="embalagens" title="Embalagens">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Embalagens</h5>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenEmbalagemModal()}
                >
                  + Nova Embalagem
                </Button>
              </Card.Header>
              <Card.Body>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Quantidade</th>
                      <th>Descrição</th>
                      <th>Status</th>
                      <th>Data Criação</th>
                      <th style={{ width: '120px' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.embalagens.map(embalagem => (
                      <tr key={embalagem.id}>
                        <td>{embalagem.quantidade}</td>
                        <td>{embalagem.descricao}</td>
                        <td>
                          <Badge bg={embalagem.ativa ? 'success' : 'secondary'}>
                            {embalagem.ativa ? 'Ativa' : 'Inativa'}
                          </Badge>
                        </td>
                        <td>{embalagem.dataCriacao.toLocaleDateString()}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                            onClick={() => handleOpenEmbalagemModal(embalagem)}
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteEmbalagem(embalagem.id)}
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>

        {/* Modal de Medida */}
        <Modal show={showMedidaModal} onHide={handleCloseMedidaModal}>
          <Form onSubmit={handleSaveMedida}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editingMedida ? 'Editar Medida' : 'Nova Medida'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nome *</Form.Label>
                <Form.Control
                  type="text"
                  value={formMedida.nome}
                  onChange={e =>
                    setFormMedida({ ...formMedida, nome: e.target.value })
                  }
                  placeholder="Ex: Quilogramas"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sigla *</Form.Label>
                <Form.Control
                  type="text"
                  value={formMedida.sigla}
                  onChange={e =>
                    setFormMedida({ ...formMedida, sigla: e.target.value })
                  }
                  placeholder="Ex: kg"
                  required
                  maxLength={10}
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Ativa"
                checked={formMedida.ativa}
                onChange={e =>
                  setFormMedida({ ...formMedida, ativa: e.target.checked })
                }
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseMedidaModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingMedida ? 'Atualizar' : 'Criar'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Modal de Tipo de Produto */}
        <Modal show={showTipoModal} onHide={handleCloseTipoModal}>
          <Form onSubmit={handleSaveTipo}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editingTipo
                  ? 'Editar Tipo de Produto'
                  : 'Novo Tipo de Produto'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nome *</Form.Label>
                <Form.Control
                  type="text"
                  value={formTipo.nome}
                  onChange={e =>
                    setFormTipo({ ...formTipo, nome: e.target.value })
                  }
                  placeholder="Ex: Alimentos"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formTipo.descricao}
                  onChange={e =>
                    setFormTipo({ ...formTipo, descricao: e.target.value })
                  }
                  placeholder="Descrição opcional do tipo de produto"
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Ativo"
                checked={formTipo.ativa}
                onChange={e =>
                  setFormTipo({ ...formTipo, ativa: e.target.checked })
                }
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseTipoModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingTipo ? 'Atualizar' : 'Criar'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Modal de Embalagem */}
        <Modal show={showEmbalagemModal} onHide={handleCloseEmbalagemModal}>
          <Form onSubmit={handleSaveEmbalagem}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editingEmbalagem ? 'Editar Embalagem' : 'Nova Embalagem'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Quantidade *</Form.Label>
                <Form.Control
                  type="number"
                  value={formEmbalagem.quantidade}
                  onChange={e =>
                    setFormEmbalagem({
                      ...formEmbalagem,
                      quantidade: Number(e.target.value),
                    })
                  }
                  min={1}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descrição *</Form.Label>
                <Form.Control
                  type="text"
                  value={formEmbalagem.descricao}
                  onChange={e =>
                    setFormEmbalagem({
                      ...formEmbalagem,
                      descricao: e.target.value,
                    })
                  }
                  placeholder="Ex: 1 unidade"
                  required
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Ativa"
                checked={formEmbalagem.ativa}
                onChange={e =>
                  setFormEmbalagem({
                    ...formEmbalagem,
                    ativa: e.target.checked,
                  })
                }
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEmbalagemModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingEmbalagem ? 'Atualizar' : 'Criar'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
};

export default Configuracoes;
