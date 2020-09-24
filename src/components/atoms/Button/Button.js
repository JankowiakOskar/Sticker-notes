import styled, { css } from 'styled-components';

const Button = styled.button`
  width: ${({ width }) => width || '200px'};
  height: 40px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
  translate: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  ${({ secondary }) =>
    secondary &&
    css`
      width: 100px;
      background-color: ${({ theme }) => theme.blue};
    `}
`;

export default Button;
