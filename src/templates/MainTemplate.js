import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PageContext } from 'contexts';
import ThemeConfig from 'theme/MainTheme';
import GlobalStyle from 'theme/GlobalStyles';
import { withRouter } from 'react-router-dom';
import LoadingPage from 'pages/LoadingPage';
import store from 'store';

const MainTemplate = ({ children, location: { pathname } }) => {
  const [pageType, setPageType] = useState('');
  useEffect(() => {
    const pageTypes = ['favoritenotes'];
    const [currentPage] = pageTypes.filter((type) => pathname.includes(type));
    setPageType(currentPage);
  }, [pathname]);

  return (
    <PageContext.Provider value={pageType}>
      <ThemeProvider theme={ThemeConfig}>
        <Provider store={store}>
          <GlobalStyle />
          <LoadingPage />
          {children}
        </Provider>
      </ThemeProvider>
    </PageContext.Provider>
  );
};

MainTemplate.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.element.isRequired,
};

export default withRouter(MainTemplate);
