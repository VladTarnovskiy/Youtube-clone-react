import { FC } from 'react';
import * as S from './styled';
import Logo from 'assets/Logo.svg';
import { SearchBar } from '../SearchBar';
import { ThemeSwitch } from '../ThemeSwitch';
import { NavLink } from 'react-router-dom';
import { BurgerMenu } from '../BurgerMenu';

export const Header: FC = () => {
  return (
    <>
      <S.StyledHeader>
        <NavLink to="/">
          <S.LogoContainer>
            <S.LogoImg src={Logo}></S.LogoImg>
            <S.LogoTitle>ModsenFilms</S.LogoTitle>
          </S.LogoContainer>
        </NavLink>
        <S.SearchBarDesktopContainer>
          <SearchBar />
        </S.SearchBarDesktopContainer>
        <S.SwitchContainer>
          <ThemeSwitch />
        </S.SwitchContainer>
        <BurgerMenu />
      </S.StyledHeader>
      <S.SearchBarMobileContainer>
        <SearchBar />
      </S.SearchBarMobileContainer>
    </>
  );
};
