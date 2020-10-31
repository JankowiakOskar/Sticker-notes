/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import AddForm from 'components/organisms/AddForm/AddForm';
import throwaway from 'assets/svg/throwaway.svg';
import { connect } from 'react-redux';
import { hideModal as hideModalAction, deleteItem as deleteItemAction } from 'actions';

const StyledModal = Modal.styled`
  position: absolute;
  padding: 25px 100px 0;
  max-height: 650px;
  box-shadow: inset -5px -4px 40px 5px rgba(0, 0, 0, 0.2);
  width: 700px;
  background-color: ${({ theme }) => theme.white};
  left: 50%;
  top: 5%;
  transform: translate(-50%, 0);
  border-radius: 5px;
`;

const StyledHeading = styled(Heading)`
  padding: 0 0 8px 0;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.lightgrey};
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const FormWrapper = styled.div`
  padding: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  padding: 20px 0 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ThrowAway = styled.div`
  height: 250px;
  width: 60%;
  background-image: url(${throwaway});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
`;
const Emoji = styled.span`
  margin: 0 0 0 10px;
  font-size: 2.2rem;
`;

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
            <StyledHeading size="l">
              Edytuj notatkę{' '}
              <Emoji aria-label="add_note_emoji" role="img">
                ✍
              </Emoji>{' '}
            </StyledHeading>
            <FormWrapper>
              <AddForm noteToEdit={note} />
            </FormWrapper>
          </>
        );
      case 'delete':
        return (
          <>
            <StyledHeading size="l">
              Usuwanie notatki
              <Emoji aria-label="add_note_emoji" role="img">
                ❌
              </Emoji>{' '}
            </StyledHeading>
            <ContentWrapper>
              <StyledParagraph size="m">Czy na pewno chcesz usunąć notatkę ? </StyledParagraph>
              <ThrowAway />
              <ButtonsWrapper>
                <Button secondary onClick={() => handleClick('notes', id)}>
                  Tak
                </Button>
                <Button thirdiary onClick={handleClick}>
                  Nie
                </Button>
              </ButtonsWrapper>
            </ContentWrapper>
          </>
        );
      default:
        break;
    }
  };
  return (
    <StyledModal isOpen={isShownModal} onBackgroundClick={hideModal} onEscapeKeydown={hideModal}>
      {type && <ModalDisplayer typeModal={type} note={matchedNote} />}
    </StyledModal>
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
