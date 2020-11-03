/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle';
import { connect } from 'react-redux';
import { HIDE_NEW_ITEM_BAR } from 'actions';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: -5px;
  width: 500px;
  height: 100vh;
  background-color: ${({ theme }) => theme.white};
  border-left: 5px solid ${({ theme }) => theme.dark};
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
  transition: transform 0.2s ease-in-out;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  z-index: 9999;

  @media (max-width: 767px) {
    width: 90vw;
    height: 100%;
    border-radius: 25px 0 0 25px;
    overflow-y: scroll;
  }
`;

const InnerWrapper = styled.div`
  padding: 100px 40px;

  @media (max-width: 767px) {
    padding: 25px;
  }
`;

const StyledHeading = styled(Heading)`
  padding: 0 0 10px;
  border-bottom: 1px solid hsl(240, 3%, 87%);
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes.mobileLarge};
  }
`;

const StyledFormWrapper = styled.div`
  margin: 25px 0;
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
    right: 20px;
    bottom: 20px;
  }
`;

const Emoji = styled.span`
  margin: 0 0 0 10px;
  font-size: 2.2rem;
`;

const NewItemBar = ({ isShownNewItemBar, hideNewItemBar, isShownModal, children }) => {
  useEffect(() => {
    if (isShownModal && isShownNewItemBar) {
      hideNewItemBar();
    }
  }, [isShownModal, isShownNewItemBar]);

  return (
    <StyledWrapper isOpen={isShownNewItemBar}>
      <InnerWrapper>
        <StyledHeading size="l">
          Dodaj nową notatkę{' '}
          <Emoji aria-label="add_note_emoji" role="img">
            📝
          </Emoji>{' '}
        </StyledHeading>
        <StyledFormWrapper>{children}</StyledFormWrapper>
        <StyledCloseIcon onClick={() => hideNewItemBar()} />
      </InnerWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => {
  const {
    isShownNewItemBar,
    modal: { isShownModal },
  } = state.data;
  return {
    isShownNewItemBar,
    isShownModal,
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
