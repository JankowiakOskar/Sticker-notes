import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Button from 'components/atoms/Button/Button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { addItem as addItemAction, HIDE_NEW_ITEM_BAR } from 'actions';
import TextField from 'components/molecules/TextField/TextField';
import InputElement from 'components/molecules/InputElement/InputElement';
import CheckBox from 'components/atoms/CheckBox/CheckBox';
import Dropzone from 'components/molecules/Dropzone/Dropzone';
import { Done } from '@styled-icons/material/Done';
import { Delete } from '@styled-icons/material/Delete';
import { firstTenChars } from 'utils';
import Loader from 'react-loader-spinner';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  margin: 50px 0 0;

  @media (max-width: 768px) {
    margin: 20px 0 0;
  }
`;

const CheckBoxWrapper = styled.div`
  margin: 10px 0;
`;

const DropzoneCard = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const showAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate(0, -30px)
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const FileConfirm = styled.span`
  padding: 0 10px;
  opacity: 0;
  font-size: ${({ theme }) => theme.fontSizes.m};
  animation: ${showAnimation} 0.3s forwards ease-in-out;
`;
const StyledDone = styled(Done)`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.dark};
  animation: ${showAnimation} 0.3s forwards ease-in-out;
`;

const StyledDelete = styled(Delete)`
  padding: 2px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
  cursor: pointer;
`;

const SupportedFilesTypes = [];

const AddSchema = Yup.object().shape({
  title: Yup.string().required('Brak wymaganego tytułu').min(4, 'Twój tytuł jest za krótki'),
  text: Yup.string().required('Brak treści notatki').min(5, 'Tresć Twojej notatki jest za krótka'),
  favoriteNote: Yup.boolean(),
});

const initialValues = {
  title: '',
  text: '',
  favoriteNote: false,
  checkUpload: false,
  note_file: [],
};

const AddForm = ({ addItem, hideNewItemBar, isLoading }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddSchema}
      onSubmit={async ({ title, text, favoriteNote, note_file }, { resetForm }) => {
        await addItem(
          {
            note_title: title,
            note_content: text,
            favoriteNote,
            note_file: note_file[0],
          },
          'notes',
        );
        await hideNewItemBar();
        await resetForm(initialValues);
      }}
    >
      {({ values, setFieldValue }) => (
        <StyledForm as={Form}>
          <InputElement name="title" label="Tytuł notatki" type="text" />
          <TextField name="text" label="Treść notatki" />
          <CheckBoxWrapper>
            <CheckBox name="favoriteNote" label="Dodaj do ulubionych notatek " />
          </CheckBoxWrapper>
          <CheckBoxWrapper>
            <CheckBox name="checkUpload" label="Czy chcesz dodać zdjęcie?" />
          </CheckBoxWrapper>
          {values.checkUpload && (
            <DropzoneCard>
              <Dropzone
                disabled={values.note_file.length}
                addFile={(file) => setFieldValue('note_file', file)}
                allowFiles="image/*"
              />
              {values.note_file.length ? (
                <>
                  <FileConfirm>{`Dodano plik: ${firstTenChars(
                    values.note_file[0].name,
                  )}`}</FileConfirm>
                  <StyledDone />
                  <StyledDelete onClick={() => setFieldValue('note_file', [])} />
                </>
              ) : null}
            </DropzoneCard>
          )}

          <StyledButton type="submit" disabled={isLoading}>
            {!isLoading ? (
              'Dodaj notatkę'
            ) : (
              <Loader type="TailSpin" color="#FFFFFF" height={30} width={30} />
            )}
          </StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.data.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item, itemType) => dispatch(addItemAction(item, itemType)),
    hideNewItemBar: () => dispatch({ type: HIDE_NEW_ITEM_BAR }),
  };
};

AddForm.propTypes = {
  addItem: PropTypes.func.isRequired,
  hideNewItemBar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
