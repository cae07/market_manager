// Estrutura básica do roteamento
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProvider } from './context';
import {
  HomePage,
  TestPage,
  OutroTestePage,
  EscrevaPage,
  ConfiguracoesPage,
} from './pages';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/outroTeste" element={<OutroTestePage />} />
          <Route path="/escreva" element={<EscrevaPage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
