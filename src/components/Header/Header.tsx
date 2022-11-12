import * as S from './Header.styles';
import { Timer, Scroll } from 'phosphor-react';
import logo from '../../assets/logo.svg';
import { defaultTheme } from '../../styles/themes/default';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const mainColor = defaultTheme['pink-500'];

  return (
    <S.HeaderContainer>
      <img src={logo} alt='Brand logo, two triangles' />
      <nav>
        <NavLink to='/' title='Timer home page'>
          <Timer size={24} />
        </NavLink>
        <NavLink to='/history' title='Timer history'>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </S.HeaderContainer>
  );
};
