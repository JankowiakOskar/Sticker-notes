import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme, size }) => size && theme.fontSizes[size]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme, color }) => (color ? theme[color] : theme.grey)};
`;

export default Paragraph;
