import React from 'react';

import { Header } from '../components/common';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <h1>Página Inicial</h1>
      <p>Bem-vindo ao nosso aplicativo de gerenciamento de despesas!</p>
    </div>
  );
};

export default HomePage;
