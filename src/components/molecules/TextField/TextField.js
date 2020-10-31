import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Label from 'components/atoms/Label/Label';
import { useField } from 'formik';

const StyledInputElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTextArea = styled.textarea`
  max-width: 350px;
  height: 100px;
  padding: 5px;
  border: 2px solid ${({ theme }) => theme.lightblue};
  border-radius: 5px;
  z-index: 999;
  resize: none;
  transition: all 0.2s ease-in-out;

  &:focus ~ label {
    transform: translate(0px, -130px);
    color: ${({ theme }) => theme.lightblue};
  }
  ${({ value }) =>
    value.length &&
    css`
      & ~ label {
        transform: translate(0, -130px);
      }
    `}
  @media (max-width: 768px) {
    width: 70%;
  }
`;
const StyledLabel = styled(Label)`
  padding: 5px;
  transform: translate(7px, -100px);
  z-index: 888;
  transition: all 0.2s ease-in-out;
`;

const StyledError = styled.p`
  color: ${({ theme }) => theme.red};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const TextField = (props) => {
  const [field, meta] = useField(props);
  const { name, label } = props;
  const error = meta.touched && meta.error;

  return (
    <StyledInputElement>
      <StyledTextArea {...props} {...field} spellCheck="false" />
      <StyledLabel name={name}>{error ? <StyledError>{error}</StyledError> : label}</StyledLabel>
    </StyledInputElement>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextField;
