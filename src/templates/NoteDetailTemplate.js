import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteItem as deleteItemAction } from 'actions';
import moment from 'moment';
import 'moment/locale/pl';

const StyledWrapper = styled.div`
  margin: 50px 0 0 80px;
  max-width: 750px;
  min-height: 450px;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 2px solid ${({ theme }) => theme.lightgrey};
  border-radius: 25px;
  overflow: hidden;

  @media (max-width: 767px) {
    margin: 50px auto;
    padding: 20px 10px 20px 20px;
    min-height: auto;
    width: 88%;
  }
`;

const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.lightgrey};
`;

const StyledTimeCreated = styled(Paragraph)`
  padding: 5px 0;
`;

const StyledNoteContent = styled(Paragraph)`
  color: ${({ theme }) => theme.black};
  width: 100%;
  padding: 30px 0 30px 0;
`;

const ButtonsWrapper = styled.div`
  flex-grow: 1;
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  @media (max-width: 767px) {
    flex-grow: none;
  }
`;

const NotePhotoWrapper = styled.div`
  max-width: 500px;
  border-radius: 25px;
`;

const NotePhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 25px;
`;

const StyledButton = styled(Button)`
  margin: 0 20px;
  background-color: ${({ theme }) => theme.blue};
`;

const NoteDetailTemplate = ({
  id,
  title,
  content,
  createdAt,
  history: { goBack },
  deleteItem,
  photoUrl,
}) => {
  const handleDelete = () => {
    deleteItem('notes', id);
    goBack();
  };
  return (
    <StyledWrapper>
      <Header>
        <Heading>{title}</Heading>
        <StyledTimeCreated size="m">Utworzona: {moment(createdAt).calendar()}</StyledTimeCreated>
      </Header>
      <StyledNoteContent size="m">{content}</StyledNoteContent>
      {photoUrl && (
        <NotePhotoWrapper>
          <NotePhoto src={`https://organiser-strapi-mongodb.herokuapp.com${photoUrl}`} />
        </NotePhotoWrapper>
      )}
      <ButtonsWrapper>
        <StyledButton secondary onClick={goBack}>
          Wróć
        </StyledButton>
        <Button secondary onClick={handleDelete}>
          Usuń
        </Button>
      </ButtonsWrapper>
    </StyledWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { deleteItem: (itemType, id) => dispatch(deleteItemAction(itemType, id)) };
};

NoteDetailTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(withRouter(NoteDetailTemplate));
