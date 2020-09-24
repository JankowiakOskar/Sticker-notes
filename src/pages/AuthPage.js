import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AuthTypeContext } from 'contexts';
import { connect } from 'react-redux';
import AuthTemplate from 'templates/AuthTemplate';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.dark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AuthPage = ({ location: { pathname } }) => {
  const authTypes = ['login', 'register'];
  const [currentAuthType, setCurrentAuthType] = useState('login');

  useEffect(() => {
    const [authType] = authTypes.filter((type) => pathname.includes(type));
    setCurrentAuthType(authType);
  }, [pathname, authTypes]);

  return (
    <AuthTypeContext.Provider value={currentAuthType}>
      <Wrapper>
        <AuthTemplate />
      </Wrapper>
    </AuthTypeContext.Provider>
  );
};

AuthPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.oneOf(['/login', '/register']).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { tokenJWT } = state.auth;
  return {
    isAuth: tokenJWT,
  };
};

export default connect(mapStateToProps, null)(AuthPage);
