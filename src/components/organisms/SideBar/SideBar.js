import React, { useContext, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ClipboardData } from '@styled-icons/bootstrap/ClipboardData';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill';
import { FileEarmarkPlus } from '@styled-icons/bootstrap/FileEarmarkPlus';
import { NavLink, withRouter } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { SHOW_NEW_ITEM_BAR } from 'actions';
import { logOutUser as logOutUserAction } from 'actions/authActions';
import { PageContext } from 'contexts';
import { LogoutCircle } from '@styled-icons/remix-line/LogoutCircle';
import Circle from 'components/atoms/Circle/Circle';
import { sumItemsWithKey } from 'utils';
import gsap from 'gsap';
import usePreviousLiked from 'hooks/usePrevious';
import useWidthdevice from 'hooks/useWidthdevice';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.dark};
  box-shadow: 0px 6px 12px -4px rgba(0, 0, 0, 0.75);
  border-right: 1px solid ${({ theme }) => theme.black};
  z-index: 9999;

  @media (max-width: 767px) {
    bottom: 0;
    top: calc(100% - 70px);
    width: 100%;
    height: 70px;
    z-index: 9999;
    flex-direction: row;
    justify-content: flex-start;
    border-radius: 15px 15px 0 0;
  }
`;

const StyledNav = styled.nav`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 55px 0;
  list-style: none;

  @media (max-width: 767px) {
    flex-direction: row;
    margin: 0 45px 0 0;
    justify-content: center;
  }
`;

const StyledIconWrapper = styled.li`
  margin: 20px 0 0 0;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
  transition: background 0.15s linear;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme, favoritetype }) =>
      favoritetype ? theme.red : 'rgba(104, 113, 209, 0.3)'};
  }

  &.active {
    background-color: ${({ theme, favoritetype }) => (favoritetype ? theme.red : theme.blue)};
  }

  ${({ logOutIcon }) =>
    logOutIcon &&
    css`
      position: absolute;
      bottom: 7%;

      @media (max-width: 767px) {
        position: absolute;
        top: 50%;
        left: 95%;
        transform: translate(-100%, -50%);
        margin: 0;
      }
    `}

  ${({ favorites }) =>
    favorites &&
    css`
      position: relative;
    `}

    @media (max-width: 767px) {
    margin: 0 5px;
    padding: 10px;
    width: 50px;
    height: 50px;
  }
`;

const StyledButton = styled(Button)`
  margin: 50px 0 0 0;
  height: 50px;
  padding: 25px 0;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.blue};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.m};
  transition: background-color 0.2s ease-in;

  ${({ favoritetype }) =>
    favoritetype &&
    css`
      background-color: ${({ theme }) => theme.red};
      color: ${({ theme }) => theme.white};
    `}

  @media (max-width: 767px) {
    position: relative;
    left: 5%;
    margin: 0;
    padding: 10px;
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
`;

const StyledNotesIcon = styled(ClipboardData)`
  width: 50px;
  color: ${({ theme }) => theme.white};
`;

const StyledHeartIcon = styled(HeartFill)`
  width: 50px;
  color: ${({ theme }) => theme.white};
`;
const StyledAddFileIcon = styled(FileEarmarkPlus)`
  width: 50px;
  color: ${({ theme, favoritetype }) => (favoritetype ? theme.white : theme.blue)};
`;

const StyledLogoutIcon = styled(LogoutCircle)`
  width: 50px;
  color: ${({ theme }) => theme.white};
`;

const StyledCircle = styled(Circle)`
  position: absolute;
  top: -10%;
  right: -10%;

  @media (max-width: 767px) {
    top: -10%;
    right: -15%;
  }
`;

const SideBar = ({ isShownNewItemBar, isShownModal, showNewItemBar, logOutUser, allNotes }) => {
  const pageType = useContext(PageContext);
  const circleRef = useRef(null);
  const currentLikedNotes = sumItemsWithKey(allNotes, 'favoriteNote');
  const previousLikedNotes = usePreviousLiked(currentLikedNotes, allNotes, 'favoriteNote');
  const { isInWidth } = useWidthdevice('767');

  useEffect(() => {
    if (previousLikedNotes !== currentLikedNotes) {
      const circle = circleRef.current;
      const tl = gsap.timeline({ defaults: { ease: 'Power2.out' } });
      tl.to(circle, { scale: 1.2, duration: 0.2 }).to(circle, { scale: 1, duration: 0.2 });
    }
  }, [currentLikedNotes]);

  return (
    <StyledWrapper>
      <StyledButton
        width="150px"
        favoritetype={pageType}
        onClick={() => showNewItemBar()}
        disabled={isShownNewItemBar || isShownModal}
      >
        <StyledAddFileIcon favoritetype={pageType} />
      </StyledButton>
      <StyledNav>
        <StyledIconWrapper
          as={NavLink}
          to="/notes"
          exact
          activeClassName="active"
          data-tip="Wszystkie notatki"
          data-for="allNotes"
        >
          <StyledNotesIcon />
        </StyledIconWrapper>

        <StyledIconWrapper
          favorites
          as={NavLink}
          to="/favoritenotes"
          exact
          activeClassName="active"
          favoritetype={pageType}
          data-tip="Ulubione notatki"
          data-for="favoriteNotes"
        >
          <StyledHeartIcon />
          <StyledCircle ref={circleRef}>{currentLikedNotes}</StyledCircle>
        </StyledIconWrapper>
      </StyledNav>
      <StyledIconWrapper logOutIcon data-tip="Wyloguj się" data-for="logOut" onClick={logOutUser}>
        <StyledLogoutIcon />
      </StyledIconWrapper>
      {isInWidth && (
        <>
          <ReactTooltip
            backgroundColor="#5D65D3"
            id="allNotes"
            effect="solid"
            type="info"
            place="right"
          />
          <ReactTooltip
            backgroundColor="#5D65D3"
            id="favoriteNotes"
            effect="solid"
            type="info"
            place="right"
          />
          <ReactTooltip
            backgroundColor="#5D65D3"
            id="logOut"
            effect="solid"
            type="info"
            place="right"
          />
        </>
      )}
    </StyledWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showNewItemBar: () => dispatch({ type: SHOW_NEW_ITEM_BAR }),
  logOutUser: () => dispatch(logOutUserAction()),
});

const mapStateToProps = (state) => {
  const {
    isShownNewItemBar,
    notes,
    modal: { isShownModal },
  } = state.data;

  return {
    isShownNewItemBar,
    allNotes: notes,
    isShownModal,
  };
};

SideBar.propTypes = {
  showNewItemBar: PropTypes.func.isRequired,
  isShownNewItemBar: PropTypes.bool.isRequired,
  logOutUser: PropTypes.func.isRequired,
  allNotes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      note_title: PropTypes.string.isRequired,
      note_content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      favoriteNote: PropTypes.bool.isRequired,
    }),
  ),
};

SideBar.defaultProps = {
  allNotes: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar));
