import styled from 'styled-components';

const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme, size }) => (size ? theme.fontSizes[size] : theme.fontSizes.s)};
`;

export default Label;
