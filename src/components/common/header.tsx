import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <Nav variant="tabs" className="custom-nav-tabs w-100">
        <LinkContainer to="/" className="flex-fill">
          <Nav.Link className="text-center custom-nav-link">
            <span className="nav-text">Home</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/lancamento" className="flex-fill">
          <Nav.Link className="text-center custom-nav-link">
            <span className="nav-text">Lançamento Mercado</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/outroTeste" className="flex-fill">
          <Nav.Link className="text-center custom-nav-link">
            <span className="nav-text">Test 2</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/escreva" className="flex-fill">
          <Nav.Link className="text-center custom-nav-link">
            <span className="nav-text">Cadastro</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/configuracoes" className="flex-fill">
          <Nav.Link className="text-center custom-nav-link">
            <span className="nav-text">Config</span>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default Header;
