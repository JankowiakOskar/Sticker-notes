import styled from 'styled-components';

const Heading = styled.h1`
  font-size: ${({ theme, size }) => (size ? theme.fontSizes[size] : theme.fontSizes.xl)};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export default Heading;
