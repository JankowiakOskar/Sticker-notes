import React from 'react';
import styled from 'styled-components';
import CheckBox from './CheckBox';

export default {
  title: 'atoms/checkbox',
};

const Wrapper = styled.div`
  margin: 50px;
`;

export const Primary = () => (
  <Wrapper>
    <CheckBox />
  </Wrapper>
);
