import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle';
import { connect } from 'react-redux';
import { HIDE_NEW_ITEM_BAR } from 'actions';
import sticky_note from 'assets/svg/sticky_note.svg';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: -5px;
  width: 500px;
  height: 105vh;
  background-color: ${({ theme }) => theme.white};
  border: 5px solid ${({ theme }) => theme.dark};
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
  transition: transform 0.2s ease-in-out;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  z-index: 9999;

  @media (max-width: 767px) {
    height: 100%;
    width: 100%;
  }
`;

const StyledHeading = styled(Heading)`
  margin-top: 100px;
  padding: 0 0 5px 30px;
  color: ${({ theme }) => theme.dark};
  border-bottom: 3px solid ${({ theme }) => theme.dark};
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    margin: 0;
    padding: 20px 10px;
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
`;

const StyledFormWrapper = styled.div`
  margin: 50px 30px;

  @media (max-width: 767px) {
    margin: 10px 10px;
  }
`;

const StyledCloseIcon = styled(CloseCircle)`
  position: absolute;
  bottom: 50px;
  right: 20px;
  width: 70px;
  color: ${({ theme }) => theme.dark};
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  &:hover {
    transform: rotate(360deg);
  }

  @media (max-width: 767px) {
    right: 5px;
    bottom: 20px;
  }
`;

const StyledNoteIcon = styled.img`
  width: 50px;
  fill: ${({ theme }) => theme.dark};
`;

const NewItemBar = ({ isShownNewItemBar, hideNewItemBar, children }) => {
  return (
    <StyledWrapper isOpen={isShownNewItemBar}>
      <StyledHeading>
        Dodaj nową notatkę <StyledNoteIcon src={sticky_note} />
      </StyledHeading>
      <StyledFormWrapper>{children}</StyledFormWrapper>
      <StyledCloseIcon onClick={() => hideNewItemBar()} />
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => {
  const { isShownNewItemBar } = state.data;
  return {
    isShownNewItemBar,
  };
};

const mapDispatchToProps = (dispatch) => ({
  hideNewItemBar: () => dispatch({ type: HIDE_NEW_ITEM_BAR }),
});

NewItemBar.propTypes = {
  hideNewItemBar: PropTypes.func.isRequired,
  isShownNewItemBar: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewItemBar);
