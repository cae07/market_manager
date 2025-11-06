// Estrutura básica do roteamento
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage, TestPage } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
