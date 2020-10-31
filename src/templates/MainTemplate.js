import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PageContext } from 'contexts';
import ThemeConfig from 'theme/MainTheme';
import GlobalStyle from 'theme/GlobalStyles';
import { withRouter } from 'react-router-dom';
import LoadingPage from 'pages/LoadingPage';
import store from 'store';
import { ModalProvider } from 'styled-react-modal';

const SpecialModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% + 180px);
  height: 100vh;
  background-color: rgba(51, 51, 51, 0.7);
`;

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
          <ModalProvider backgroundComponent={SpecialModalBackground}>
            <GlobalStyle />
            <LoadingPage />
            {children}
          </ModalProvider>
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
