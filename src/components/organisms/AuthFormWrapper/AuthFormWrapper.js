import React, { useContext } from 'react';
import { AuthTypeContext } from 'contexts';
import * as Yup from 'yup';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import InputElement from 'components/molecules/InputElement/InputElement';
import AuthFormWizard from './AuthFormWizard/AuthFormWizard';

const Wrapper = styled.div`
  width: 450px;
  height: 555px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.white};
  opacity: 0.9;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

  @media (max-width: 878px) {
    height: auto;
  }

  @media (max-width: 465px) {
    width: 355px;
  }
`;

const Header = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.dark};
  border-bottom: 2px solid ${({ theme }) => theme.dark};
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
`;

const FormStep = styled.div`
  padding: 20px 20px 0 20px;
  width: 100%;
`;

const StyledInputElement = styled(InputElement)`
  width: 100%;
`;

const dataValues = {
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  street: '',
  postCode: '',
  username: '',
  password: '',
  confirmedPassword: '',
};

const firstRegisterStep = Yup.object({
  firstName: Yup.string().required('Wprowadź imię'),
  lastName: Yup.string().required('Podaj swoje nazwisko'),
  email: Yup.string().email('Niepoprawny format adresu email').required('Brak adresu email'),
});

const secondRegisterStep = Yup.object({
  city: Yup.string().required('Brak nazwy miasta'),
  street: Yup.string().required('Brak ulicy'),
  postCode: Yup.string()
    .required('Brak kodu pocztowego')
    .matches(/^[0-9]+$/, 'Kod pocztowy musi zawierać tylko cyfry')
    .min(5, 'Wymagane minimum 5 cyfr'),
});

const lastRegisterStep = Yup.object({
  username: Yup.string().required('Podaj nazwę użytkownika'),
  password: Yup.string()
    .required('Brak hasła')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Wymagane 8 znaków, duża litra i jedna cyfra',
    ),
  confirmedPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Twoje hasła muszą być takie same',
  ),
});

const loginSchema = Yup.object({
  email: Yup.string().email('Niepoprawny format adresu email').required('Brak adresu email'),
  password: Yup.string().required('Brak hasła'),
});

const AuthFormWrapper = () => {
  const authType = useContext(AuthTypeContext);
  return (
    <Wrapper>
      <Header>
        <Heading>{authType === 'login' ? 'Zaloguj się' : 'Rejestracja'}</Heading>
        <Paragraph size="m" color="white">
          {authType === 'login'
            ? 'Wprowadź swoje dane, aby się zalogować'
            : 'Uzupełnij dane, aby założyć nowe konto'}
        </Paragraph>
      </Header>
      <AuthFormWizard initialValues={dataValues} authType={authType}>
        {authType === 'login' ? (
          <>
            <FormStep validationSchema={loginSchema}>
              <StyledInputElement name="email" label="Email" type="email" />
              <StyledInputElement name="password" label="Hasło" type="password" />
            </FormStep>
          </>
        ) : (
          <>
            <FormStep validationSchema={firstRegisterStep}>
              <StyledInputElement name="firstName" label="Imię" type="text" />
              <StyledInputElement name="lastName" label="Nazwisko" type="text" />
              <StyledInputElement name="email" label="Adres email" type="email" />
            </FormStep>
            <FormStep validationSchema={secondRegisterStep}>
              <StyledInputElement name="street" label="Ulica" type="text" />
              <StyledInputElement name="postCode" label="Kod pocztowy" type="text" />
              <StyledInputElement name="city" label="Miasto" type="text" />
            </FormStep>
            <FormStep validationSchema={lastRegisterStep}>
              <StyledInputElement name="username" label="Twój login" type="text" />
              <StyledInputElement name="password" label="Hasło" type="password" />
              <StyledInputElement
                name="confirmedPassword"
                label=" Potwierdź hasło"
                type="password"
              />
            </FormStep>
          </>
        )}
      </AuthFormWizard>
    </Wrapper>
  );
};

export default AuthFormWrapper;
