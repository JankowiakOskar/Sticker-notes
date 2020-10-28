import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100vw;
    font-family: 'Montserrat';
    line-height: 1.5;
    font-size: 10px;
    overflow-x: hidden;
  }

  body::-webkit-scrollbar {
  width: 1.5em;
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
body::-webkit-scrollbar-thumb {
  background-color: #231E3E;
  outline: 1px solid slategrey;
  border-radius: 5px;
}

button {
  outline: none;
  cursor: pointer;
}

input {
  font-size: 1.6rem;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: none;
}

textarea {
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: none;
}

ul {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyle;
