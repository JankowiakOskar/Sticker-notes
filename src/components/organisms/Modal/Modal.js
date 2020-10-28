import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import AddForm from 'components/organisms/AddForm/AddForm';
import { connect } from 'react-redux';
import { hideModal as hideModalAction, deleteItem as deleteItemAction } from 'actions';

Modal.setAppElement('#root');

const StyledHeading = styled(Heading)`
  margin: 20px 0 50px 0;
`;

const customStyles = {
  content: {
    maxWidth: 'auto',
    width: '600px',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
};

const ModalComponent = ({ modal, hideModal, deleteItem, matchedNote }) => {
  const { isShownModal, type, id } = modal;

  const handleClick = async (itemType, itemID) => {
    if (itemType && itemID) {
      await deleteItem(itemType, id);
      await hideModal();
    } else {
      hideModal();
    }
  };

  const ModalDisplayer = ({ typeModal, note }) => {
    switch (typeModal) {
      case 'edit':
        return (
          <>
            <StyledHeading>
              Edytuj notatkę{' '}
              <span aria-label="add_note_emoji" role="img">
                ✍
              </span>{' '}
            </StyledHeading>
            <AddForm noteToEdit={note} />
          </>
        );
      case 'delete':
        return (
          <>
            <StyledHeading>
              Usuwanie notatki
              <span aria-label="add_note_emoji" role="img">
                ❌
              </span>{' '}
            </StyledHeading>
            <Paragraph>Czy na pewno chcesz usunąć notatkę</Paragraph>
            <Button onClick={() => handleClick('notes', id)}>Tak</Button>
            <Button secondary onClick={handleClick}>
              Nie
            </Button>
          </>
        );
      default:
        break;
    }
  };
  return (
    <Modal isOpen={isShownModal} style={customStyles} onRequestClose={hideModal}>
      {type && <ModalDisplayer typeModal={type} note={matchedNote} />}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { modal, notes } = state.data;
  const [matchedNote] = notes.filter(({ id }) => modal.id === id);
  return {
    modal,
    matchedNote,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModalAction()),
    deleteItem: (itemType, id) => dispatch(deleteItemAction(itemType, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
