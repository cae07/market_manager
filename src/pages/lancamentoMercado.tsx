import React from 'react';

import { Header, YearMonthButton } from '../components/common';
import { LancamentoMercado } from '../components/forms';
import './lancamentoMercado.css';

const LancamentoMercadoPage: React.FC = () => {
  return (
    <div className="lancamento-mercado-container">
      <Header />
      <YearMonthButton />
      <LancamentoMercado
        onSubmit={data => {
          // Processa o lançamento
          console.log(data);
        }}
      />
    </div>
  );
};

export default LancamentoMercadoPage;
