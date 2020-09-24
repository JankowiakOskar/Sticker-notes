import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme, size }) => size && theme.fontSizes[size]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export default Paragraph;
