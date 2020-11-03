import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`


  *, *::after, *::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100vw;
    height: 100%;
    font-family: 'Montserrat';
    line-height: 1.5;
    font-size: 10px;
    overflow: hidden;
  }

  #root {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
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
  font-size: 1.6rem;
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
