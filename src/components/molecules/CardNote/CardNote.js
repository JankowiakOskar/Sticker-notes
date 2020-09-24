import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
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
  border-radius: 5px;
  box-shadow: 0px 6px 12px -4px rgba(0, 0, 0, 0.75);
  border: 2px solid ${({ theme }) => theme.dark};
  display: flex;
  flex-direction: column;
`;

const StyledHeadingWrapper = styled.div`
  position: relative;
  flex: 1;
  padding: 10px 20px;
  background-color: ${({ theme, favoriteType }) => (favoriteType ? theme.red : theme.dark)};
  color: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.black};

  @media (max-width: 767px) {
    padding: 10px;
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
`;

const StyledParagraph = styled(Paragraph)`
  grid-area: createdTime;
  height: 100%;
`;

const Avatar = styled.img`
  grid-area: avatar;
  position: absolute;
  width: 80px;
  height: 80px;
  border: 5px solid ${({ theme, favoriteType }) => (favoriteType ? theme.dark : theme.blue)};
  border-radius: 50%;
  right: 5px;
  top: 5px;
  z-index: 999;

  @media (max-width: 767px) {
    position: relative;
  }
`;

const StyledCardContent = styled.div`
  flex: 2;
  padding: 20px;
  overflow: hidden;
`;

const StyledCardFooter = styled.div`
  flex: 1;
  border-top: 2px solid ${({ theme }) => theme.dark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.dark};
`;

const StyledButton = styled(Button)`
  margin-right: 30px;
  background-color: ${({ theme, favoriteType }) => (favoriteType ? theme.red : theme.blue)};
`;

const StyledHeartIcon = styled(HeartFill)`
  margin-left: 20px;
  width: 50px;
  height: 50px;
  color: ${({ theme, isLiked }) => (isLiked ? theme.red : theme.white)};
  transition: color 0.15s ease-in-out;
  z-index: 6;
  cursor: pointer;
  transition: scale 0.4s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardNote = ({
  id,
  title,
  content,
  createdAt,
  deleteItem,
  favoriteNote,
  updateItem,
  photoUrl,
}) => {
  const [isLiked, setLike] = useState(favoriteNote);
  const history = useHistory();
  const pageType = useContext(PageContext);
  const cardRef = useRef(null);
  const avatarRef = useRef(null);

  const showUpAnime = () => {
    const card = cardRef.current;
    const avatar = avatarRef.current;
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.fromTo([card, avatar], { y: '-=30' }, { autoAlpha: 1, y: '0', duration: 0.4 });
  };

  const redirectRoute = () => {
    history.push(`${routes.notes}/${id}`);
  };

  const handleClick = (event, itemType) => {
    event.stopPropagation();
    deleteItem(itemType, id);
  };

  const handleLike = (event, itemType) => {
    event.stopPropagation();
    setLike(!isLiked);
    updateItem(itemType, id, { favoriteNote: !favoriteNote });
  };

  useEffect(showUpAnime, []);

  return (
    <StyledCard ref={cardRef} onClick={() => redirectRoute()} key={id}>
      <StyledHeadingWrapper favoriteType={pageType}>
        <StyledHeading size="l">{title}</StyledHeading>
        <Paragraph size="m">Utworzona: {moment(createdAt).calendar()}</Paragraph>
        {photoUrl ? (
          <Avatar
            ref={avatarRef}
            favoriteType={pageType}
            src={`https://pacific-mesa-94829.herokuapp.com${photoUrl}`}
          />
        ) : null}
      </StyledHeadingWrapper>
      <StyledCardContent>
        <StyledParagraph size="m">{content}</StyledParagraph>
      </StyledCardContent>
      <StyledCardFooter favoriteType={pageType}>
        <StyledHeartIcon isLiked={isLiked} onClick={(event) => handleLike(event, 'notes')} />
        <StyledButton
          secondary
          favoriteType={pageType}
          onClick={(event) => handleClick(event, 'notes')}
        >
          Usuń
        </StyledButton>
      </StyledCardFooter>
    </StyledCard>
  );
};

const mapStateToProps = (state) => ({ allNotes: state.data.notes });

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (itemType, id) => dispatch(deleteItemAction(itemType, id)),
  updateItem: (itemType, id, value) => dispatch(updateItemAction(itemType, id, value)),
});

CardNote.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  favoriteNote: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardNote));
