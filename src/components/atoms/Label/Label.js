import styled from 'styled-components';

const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.grey};
  font-size: ${({ theme, size }) => (size ? theme.fontSizes[size] : theme.fontSizes.m)};
`;

export default Label;
