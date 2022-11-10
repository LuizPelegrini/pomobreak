import { Container } from './styles';

import logo from '../../assets/logo.svg';
import { Timer, Scroll } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <Container>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" end title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" end title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </Container>
  );
}
