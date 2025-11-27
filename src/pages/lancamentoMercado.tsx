import React from 'react';

import { Header, YearMonthButton } from '../components/common';
import { LancamentoMercado } from '../components/forms';

const LancamentoMercadoPage: React.FC = () => {
  return (
    <div>
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
