import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from 'routes';

const PageRedirect = ({ children, isAuth }) => {
  const history = useHistory();
  useEffect(() => {
    let redirectToHome;
    let redirectToLogin;
    if (isAuth) {
      redirectToHome = setTimeout(() => {
        history.push(`${routes.home}`);
      }, 4000);
    } else if (!isAuth) {
      redirectToLogin = setTimeout(() => {
        history.push(`${routes.login}`);
      }, 4000);
    }
    return () => {
      clearTimeout(redirectToHome);
      clearTimeout(redirectToLogin);
    };
  }, [isAuth, history]);

  return <>{children}</>;
};

const mapStateToProps = (state) => {
  const { tokenJWT } = state.auth;
  return {
    isAuth: tokenJWT,
  };
};

PageRedirect.propTypes = {
  children: PropTypes.elementType,
  isAuth: PropTypes.string,
};

PageRedirect.defaultProps = {
  children: null,
  isAuth: '',
};

export default connect(mapStateToProps, null)(PageRedirect);
