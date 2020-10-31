import styled, { css } from 'styled-components';
import search from 'assets/svg/search.svg';

const Input = styled.input`
  width: 350px;
  padding: 10px 25px;
  border: none;
  border-radius: 3px;
  border-bottom: 2px solid ${({ theme }) => theme.lightblue};
  transition: background-color 0.2s ease-in;

  &::placeholder {
    color: black;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
  ${({ secondary }) =>
    secondary &&
    css`
      width: 250px;
      padding: 10px 50px;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.blue};
      border: 1.5px solid ${({ theme }) => theme.dark};
      box-shadow: 0px 6px 12px -4px rgba(0, 0, 0, 0.75);
      background-image: url(${search});
      background-repeat: no-repeat;
      background-size: 30px;
      background-position: 5% 50%;
      transition: background-color 0.1s ease-in-out;

      ::placeholder {
        color: ${({ theme }) => theme.white};
      }

      &:focus {
        background-color: ${({ theme }) => theme.dark};
        color: ${({ theme }) => theme.white};
      }
    `}
`;

export default Input;
