import React, { useContext } from 'react';
import styled from 'styled-components';
import authimage from 'assets/svg/authimage.svg';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import { Link } from 'react-router-dom';
import routes from 'routes';
import AuthFormWrapper from 'components/organisms/AuthFormWrapper/AuthFormWrapper';
import { AuthTypeContext } from 'contexts';

const Wrapper = styled.div`
  max-height: 600px;
  width: 1000px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 1);
  opacity: 0.95;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 90%;
    padding: 20px 10px;
  }

  @media (max-width: 972px) {
    padding: 10px;
  }

  @media (max-width: 878px) {
    max-height: none;
    height: 100vh;
    width: 100%;
    flex-direction: column;
  }
`;

const FormWrapper = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DescriptionWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${(theme) => theme.white};

  @media (max-width: 1024px) {
    padding: 0 10px;
  }

  @media (max-width: 878px) {
    justify-content: flex-end;
    max-height: 100px;
  }
`;

const StyledHeading = styled(Heading)`
  margin: 10px 0 0 0;
  color: ${({ theme }) => theme.dark};
  border-bottom: 3px solid ${({ theme }) => theme.dark};
  text-shadow: -1px 0px 2px rgba(150, 150, 150, 1);

  @media (max-width: 972px) {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  @media (max-width: 878px) {
    display: none;
  }
`;

const AuthImage = styled.div`
  width: 100%;
  height: 100%;
  background: url(${authimage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70%;
  opacity: 0.9;

  @media (max-width: 878px) {
    display: none;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 10px 0 0 0;

  @media (max-width: 1024px) {
    text-align: center;
  }

  @media (max-width: 878px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  width: 300px;
  height: 80px;
  padding: 10px 20px;
  margin: 0 0 30px 0;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);

  @media (max-width: 878px) {
    margin: 0;
    height: 50px;
  }
`;

const AuthTemplate = () => {
  const authType = useContext(AuthTypeContext);
  return (
    <Wrapper>
      <FormWrapper>
        <AuthFormWrapper />
      </FormWrapper>
      <DescriptionWrapper>
        <StyledHeading size="xxl">Sticker Notes</StyledHeading>
        <StyledParagraph size="m">
          Twój personalnyorganiser, przechowuje Twoje notatki i zdjęcia !
        </StyledParagraph>
        <AuthImage />
        <StyledButton>
          {authType === 'login' ? (
            <Link to={routes.register}>Nie mam konta, chcę się zarejestrować!</Link>
          ) : (
            <Link to={routes.login}>Mam już konto, chciałbym się zalogować!</Link>
          )}
        </StyledButton>
      </DescriptionWrapper>
    </Wrapper>
  );
};

export default AuthTemplate;
