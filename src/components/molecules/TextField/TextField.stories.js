import React from 'react';
import styled from 'styled-components';
import TextField from './TextField';

export default {
  title: 'molecules/TextField',
};

const StyledWrapper = styled.div`
  margin-top: 100px;
`;

export const normal = () => (
  <StyledWrapper>
    <TextField name="text" />
  </StyledWrapper>
);
