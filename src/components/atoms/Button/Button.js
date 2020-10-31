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

  &:hover {
    opacity: 0.9;
  }

  ${({ secondary }) =>
    secondary &&
    css`
      width: 100px;
      background-color: ${({ theme }) => theme.blue};
    `}

  ${({ thirdiary }) =>
    thirdiary &&
    css`
      width: 100px;
      background-color: ${({ theme }) => theme.white};
      border: 1px solid ${({ theme }) => theme.blue};
      box-shadow: none;
      color: ${({ theme }) => theme.grey};
    `}
`;

export default Button;
