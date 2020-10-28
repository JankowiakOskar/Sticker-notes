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
  margin-top: 50px;
  max-width: 750px;
  min-height: 450px;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 3px solid ${({ theme }) => theme.dark};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
  overflow: hidden;
`;

const StyledTimeCreated = styled(Paragraph)`
  padding: 5px 0;
  font-weight: bold;
`;

const StyledNoteContent = styled(Paragraph)`
  width: 100%;
  padding: 30px 0 30px 0;
`;

const StyledButtonsWrapper = styled.div`
  margin-top: 30px;
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const NotePhotoWrapper = styled.div`
  max-width: 500px;
  border: 2px solid ${({ theme }) => theme.dark};
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
`;

const NotePhoto = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
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
      <Heading>Tytuł: {title}</Heading>
      <StyledTimeCreated size="m">Utworzona: {moment(createdAt).calendar()}</StyledTimeCreated>
      <StyledNoteContent size="m">
        <strong>Treść</strong>: {content}
      </StyledNoteContent>
      {photoUrl && (
        <NotePhotoWrapper>
          <NotePhoto src={`https://organiser-strapi-mongodb.herokuapp.com${photoUrl}`} />
        </NotePhotoWrapper>
      )}
      <StyledButtonsWrapper>
        <StyledButton secondary onClick={goBack}>
          Wróć
        </StyledButton>
        <Button secondary onClick={handleDelete}>
          Usuń
        </Button>
      </StyledButtonsWrapper>
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
