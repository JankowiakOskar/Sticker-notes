import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import KebabMenu from 'components/molecules/KebabMenu/KebabMenu';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteItem as deleteItemAction, updateItem as updateItemAction } from 'actions';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill';
import { PageContext } from 'contexts';
import routes from 'routes';
import moment from 'moment';
import 'moment/locale/pl';
import gsap from 'gsap';

const StyledCard = styled.div`
  height: 400px;
  max-width: 440px;
  opacity: 0;
  border-radius: 20px;
  box-shadow: 0px 6px 12px -4px rgba(0, 0, 0, 0.75);
  border: 2px solid ${({ theme }) => theme.dark};
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    max-width: 350px;
    max-height: 350px;
  }
`;

const StyledHeadingWrapper = styled.div`
  position: relative;
  flex: 0.8;
  padding: 10px 20px;
  border-radius: 18px 18px 0px 0px;
  background-color: ${({ theme, favoritetype }) => (favoritetype ? theme.red : theme.dark)};
  color: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.black};

  @media (max-width: 767px) {
    padding: 10px 0px 0px 20px;
    max-height: 150px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'titleNote avatar'
      'createdTime avatar';
  }
`;

const StyledHeading = styled(Heading)`
  grid-area: titleNote;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes.mobileLarge};
  }
`;

const StyledParagraph = styled(Paragraph)`
  grid-area: createdTime;
  height: 100%;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border: 5px solid ${({ theme, favoritetype }) => (favoritetype ? theme.dark : theme.blue)};
  border-radius: 50%;
  right: 5px;
  top: 5px;
  z-index: 999;

  @media (max-width: 767px) {
    top: 3px;
    right: 3px;
  }
`;

const Avatar = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const StyledCardContent = styled.div`
  flex: 2;
  padding: 20px;
  overflow: hidden;
`;

const StyledCardFooter = styled.div`
  position: relative;
  flex: 0.6;
  border-top: 2px solid ${({ theme }) => theme.dark};
  border-radius: 20px 20px 18px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.dark};
`;

const StyledKebabMenu = styled(KebabMenu)`
  z-index: 6;
  && {
    margin: 0 10px 0 0;
  }
`;

const StyledHeartIcon = styled(HeartFill)`
  margin-left: 20px;
  width: 40px;
  height: 40px;
  color: ${({ theme, isLiked }) => (isLiked ? theme.red : theme.white)};
  transition: color 0.15s ease-in-out;
  z-index: 6;
  cursor: pointer;
  transition: scale 0.4s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardNote = ({ id, title, content, createdAt, favoriteNote, updateItem, photoUrl }) => {
  const [isLiked, setLike] = useState(favoriteNote);

  const history = useHistory();
  const pageType = useContext(PageContext);
  const cardRef = useRef(null);
  const avatarRef = useRef(null);
  const tl = useRef(null);

  const showUpAnime = () => {
    const card = cardRef.current;
    tl.current = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.current.fromTo(card, { autoAlpha: 0, y: '-=30' }, { y: 0, autoAlpha: 1, duration: 0.5 });
  };

  const redirectRoute = () => {
    history.push(`${routes.notes}/${id}`);
  };

  const handleLike = (event, itemType) => {
    event.stopPropagation();
    setLike(!isLiked);
    updateItem(itemType, id, { favoriteNote: !favoriteNote });
  };

  useEffect(showUpAnime, []);
  useEffect(() => setLike(favoriteNote), [favoriteNote]);

  return (
    <StyledCard ref={cardRef} onClick={() => redirectRoute()} key={id}>
      <StyledHeadingWrapper favoritetype={pageType}>
        <StyledHeading size="desktopLarge">{title}</StyledHeading>
        <StyledParagraph size="s" color="white">
          Utworzona: {moment(createdAt).calendar()}
        </StyledParagraph>
        {photoUrl ? (
          <AvatarWrapper ref={avatarRef} favoritetype={pageType}>
            <Avatar src={`https://organiser-strapi-mongodb.herokuapp.com${photoUrl}`} />
          </AvatarWrapper>
        ) : null}
      </StyledHeadingWrapper>
      <StyledCardContent>
        <StyledParagraph size="m">{content}</StyledParagraph>
      </StyledCardContent>
      <StyledCardFooter favoritetype={pageType}>
        <StyledHeartIcon isLiked={isLiked} onClick={(event) => handleLike(event, 'notes')} />
        <StyledKebabMenu itemID={id} openCard={redirectRoute} />
      </StyledCardFooter>
    </StyledCard>
  );
};

const mapStateToProps = (state) => ({ allNotes: state.data.notes });

const mapDispatchToProps = (dispatch) => ({
  updateItem: (itemType, id, value) => dispatch(updateItemAction(itemType, id, value)),
});

CardNote.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
  favoriteNote: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardNote));
