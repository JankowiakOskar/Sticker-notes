import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme, size }) => size && theme.fontSizes[size]};
  color: ${({ theme, color }) => (color ? theme[color] : theme.grey)};
`;

export default Paragraph;
