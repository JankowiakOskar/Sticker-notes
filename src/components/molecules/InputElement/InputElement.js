import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Label from 'components/atoms/Label/Label';
import Input from 'components/atoms/Input/Input';
import { useField } from 'formik';

const StyledWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled(Label)`
  z-index: 888;
  transform: translate(7px, -30px);
  transition: all 0.2s ease-in-out;
`;

const StyledInput = styled(Input)`
  z-index: 999;
  &:focus ~ label {
    transform: translate(0, -60px);
    color: ${({ theme }) => theme.blue};
  }
  ${({ value }) =>
    value.length &&
    css`
      & ~ label {
        transform: translate(0, -60px);
      }
    `}
`;

const StyledError = styled.p`
  color: ${({ theme }) => theme.red};
`;

const InputElement = (props) => {
  const [field, meta] = useField(props);
  const { name, label } = props;
  const error = meta.touched && meta.error;
  return (
    <StyledWrapper>
      <StyledInput {...props} {...field} error={() => !!error} />
      <StyledLabel size="m" name={name}>
        {error ? <StyledError>{error}</StyledError> : label}
      </StyledLabel>
    </StyledWrapper>
  );
};

InputElement.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default InputElement;
