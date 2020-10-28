import React from 'react';
import styled from 'styled-components';
import KebabMenu from './KebabMenu';

export default {
  title: 'molecules/KebabMenu',
};

const Wrapper = styled.div`
  margin: 100px;
`;

export const normal = () => (
  <Wrapper>
    <KebabMenu />
  </Wrapper>
);
