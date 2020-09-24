import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/theme/MainTheme';
import GlobalStyle from '../src/theme/GlobalStyles';

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {storyFn()}
  </ThemeProvider>
);

export default ThemeDecorator;
