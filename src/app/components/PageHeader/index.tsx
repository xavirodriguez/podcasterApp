/**
 *
 * PageHeader
 *
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import { messages } from './messages';
interface Props {}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #222021;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  background-color: #fff;
  color: #777b7e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #777b7e;
    color: #fff;
  }
`;

export function PageHeader(props: Props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const shouldShowGoBack = location.pathname !== '/';
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <Title>Podcaster</Title>
      <NavButtons>
        {shouldShowGoBack && (
          <NavButton onClick={handleGoBack}> {t(messages.goBack())} </NavButton>
        )}
        <NavButton onClick={() => handleLanguageChange('en')}>
          {t(messages.english())}
        </NavButton>
        <NavButton onClick={() => handleLanguageChange('es')}>
          {t(messages.spanish())}
        </NavButton>
      </NavButtons>
    </HeaderContainer>
  );
}
