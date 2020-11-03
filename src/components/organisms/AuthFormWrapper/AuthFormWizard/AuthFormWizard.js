import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  createUser as createUserAction,
  loginUser as loginUserAction,
  removeServerError as removeServerErrorAction,
} from 'actions/authActions';
import { sleep } from 'utils';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import ProgressStepper from 'components/molecules/Stepper/ProgressStepper';

const StyledForm = styled.form`
  padding: 12px 0px 0px 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ theme }) => theme.boxShadow.inset};
  overflow: hidden;
`;

const ErrorMessage = styled(Paragraph)`
  color: ${({ theme }) => theme.red};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const ButtonsWrapper = styled.div`
  flex-grow: 1;
  padding: 20px 20px;
  width: 100%;
  display: flex;
  justify-content: ${({ step }) => (step > 1 ? 'space-between' : 'flex-end')};
  align-items: flex-end;
`;

const StyledButton = styled(Button)`
  text-transform: uppercase;
  padding: 0 2px;

  @media (max-width: 465px) {
    padding: 0;
    width: 120px;
  }
`;

const AuthForm = ({ children, authType, resetForm }) => {
  useEffect(() => {
    resetForm();
  }, [authType, resetForm]);

  return <StyledForm as={Form}>{children}</StyledForm>;
};

const AuthFormWizard = ({
  children,
  authType,
  initialValues,
  isSubmitting,
  createUser,
  loginUser,
  serverError,
  removeServerError,
}) => {
  const childrenArr = React.Children.toArray(children.props.children);
  const [step, setStep] = useState(1);
  const currentStep = childrenArr[step - 1];
  const isLastStep = step === childrenArr.length;
  console.log(removeServerErrorAction);
  const registerBtnContent = () => {
    switch (isSubmitting) {
      case true:
        return <Loader type="TailSpin" color="#FFFFFF" height={30} width={30} />;
      default:
        return isLastStep ? 'Zarejestruj' : 'Kontynuuj';
    }
  };

  const loginBtnContent = isSubmitting ? (
    <Loader type="TailSpin" color="#FFFFFF" height={30} width={30} />
  ) : (
    'Zaloguj się'
  );

  useEffect(() => {
    setStep(1);
  }, [authType]);

  useEffect(() => {
    if (serverError.statusCode) {
      setTimeout(removeServerError, 2500);
    }
  }, [serverError]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={currentStep ? currentStep.props.validationSchema : null}
      onSubmit={async (values, { resetForm }) => {
        if (isLastStep && authType === 'register') {
          await createUser(values);
          resetForm();
        } else if (isLastStep && authType === 'login') {
          await loginUser(values);
          resetForm();
        } else if (!isLastStep) {
          setStep((prevStep) => prevStep + 1);
        }
      }}
    >
      {({ resetForm }) => (
        <AuthForm authType={authType} resetForm={resetForm}>
          {authType === 'register' && (
            <ProgressStepper
              steps={[
                { content: '1', title: 'Dane osobowe' },
                { content: '2', title: 'Adres' },
                { content: '3', title: 'Twoje konto' },
              ]}
              activeStep={step}
            />
          )}
          {currentStep}
          {serverError.statusCode && (
            <ErrorMessage size="m">
              Error {serverError.statusCode}: {serverError.message}
            </ErrorMessage>
          )}
          <ButtonsWrapper step={step}>
            {authType === 'login' ? (
              <StyledButton type="submit" disabled={isSubmitting}>
                {loginBtnContent}
              </StyledButton>
            ) : (
              <>
                {step > 1 && (
                  <StyledButton
                    type="button"
                    onClick={() => setStep((prevStep) => prevStep - 1)}
                    disabled={isSubmitting}
                  >
                    Wróć
                  </StyledButton>
                )}
                <StyledButton type="submit" disabled={isSubmitting}>
                  {registerBtnContent()}
                </StyledButton>
              </>
            )}
          </ButtonsWrapper>
        </AuthForm>
      )}
    </Formik>
  );
};

AuthFormWizard.propTypes = {
  authType: PropTypes.oneOf(['login', 'register']).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  createUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,

  initialValues: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmedPassword: PropTypes.string.isRequired,
  }).isRequired,
};

AuthForm.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  authType: PropTypes.oneOf(['login', 'register']).isRequired,
  resetForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { isSubmitting, error: serverError } = state.auth;
  return { isSubmitting, serverError };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (userData) => dispatch(createUserAction(userData)),
    loginUser: (userData) => dispatch(loginUserAction(userData)),
    removeServerError: () => dispatch(removeServerErrorAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormWizard);
