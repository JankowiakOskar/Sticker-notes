import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getItemFromLocalStorage } from 'utils';
import routes from 'routes';

const PrivateRoute = ({ component: Component, ...restProps }) => {
  const isAuthUser = getItemFromLocalStorage('token');
  return (
    <Route
      {...restProps}
      render={(props) => (isAuthUser ? <Component {...props} /> : <Redirect to={routes.login} />)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
