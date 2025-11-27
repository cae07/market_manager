import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import './yearMonth.button.css';

import { useApp } from '../../context';

const YearButton: React.FC = () => {
  const { state, setAno, setMes } = useApp();

  // Estado para controlar o ano e mês selecionados
  const [anoSelecionado, setAnoSelecionado] = useState(state.ano);
  const [mesSelecionado, setMesSelecionado] = useState(state.mes);

  // Mês e ano definidos para o select
  const anos = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-3">
        <Col lg={8} xl={6}>
          <Form.Group>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Label className="mb-0">Ano *</Form.Label>
              </Col>
              <Col>
                <Form.Select
                  value={anoSelecionado}
                  onChange={e => setAnoSelecionado(Number(e.target.value))}
                >
                  {anos.map(ano => (
                    <option key={ano} value={ano}>
                      {ano}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Col>

        <Col lg={8} xl={6}>
          <Form.Group>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Label className="mb-0">Mês *</Form.Label>
              </Col>
              <Col>
                <Form.Select
                  value={mesSelecionado}
                  onChange={e => setMesSelecionado(e.target.value)}
                >
                  {meses.map(mes => (
                    <option key={mes} value={mes}>
                      {mes}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default YearButton;
