import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useField } from 'formik';

const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputCheckBox = styled.input`
  width: 25px;
  height: 25px;
  appearance: none;
  border: 2px solid ${({ theme }) => theme.lightblue};
  border-radius: 4px;
  transition: all 0.15s ease-in-out;
  background-color: transparent;
  cursor: pointer;

  &:active {
    border: 10px solid ${({ theme }) => theme.blue};
  }

  ${({ value }) =>
    value &&
    css`
      & + label::before {
        content: '✔';
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        color: ${({ theme }) => theme.white};
        background-color: ${({ theme }) => theme.blue};
        border-radius: 4px;
        top: 0;
        left: 0;
        z-index: -1;
      }
    `}
`;

const Label = styled.label`
  padding: 0 0 0 10px;
  font-size: ${({ theme, size }) => size && theme.fontSizes[size]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.grey};
`;

const CheckBox = (props) => {
  const [field] = useField(props);
  const { name, label } = props;

  return (
    <CheckBoxWrapper>
      <InputCheckBox {...field} {...props} type="checkbox" value={field.value} />
      <Label name={name} size="m">
        {label}
      </Label>
    </CheckBoxWrapper>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CheckBox;
