import React from 'react';
import styled from 'styled-components';
import { ThreeDotsVertical } from '@styled-icons/bootstrap/ThreeDotsVertical';

const KebabButtonIcon = styled(ThreeDotsVertical)`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.white};
  transition: all 0.15s ease-in-out;
`;

const KebabButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.blue};
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.white};
  }

  &:hover ${KebabButtonIcon} {
    color: ${({ theme }) => theme.dark};
  }
`;

const KebabButton = () => {
  return (
    <KebabButtonWrapper>
      <KebabButtonIcon />
    </KebabButtonWrapper>
  );
};

export default KebabButton;
