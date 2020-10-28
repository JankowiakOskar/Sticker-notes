import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SideBar from 'components/organisms/SideBar/SideBar';
import AddForm from 'components/organisms/AddForm/AddForm';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import ModalComponent from 'components/organisms/Modal/Modal';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 50px;
  padding-left: 250px;
  overflow-y: hidden;

  @media (max-width: 767px) {
    padding: 0;
  }
`;
const UserTemplate = ({ children }) => {
  return (
    <Wrapper>
      <SideBar />
      <NewItemBar>
        <AddForm />
      </NewItemBar>
      <ModalComponent />
      {children}
    </Wrapper>
  );
};

UserTemplate.propTypes = {
  children: PropTypes.instanceOf(Array),
};

UserTemplate.defaultProps = {
  children: [],
};

export default UserTemplate;
