import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SideBar from 'components/organisms/SideBar/SideBar';
import AddForm from 'components/organisms/AddForm/AddForm';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import ModalComponent from 'components/organisms/Modal/Modal';

const Wrapper = styled.div`
  max-width: 1700px;
  position: relative;
  width: calc(100% - 180px);
  min-height: 100vh;
  padding-bottom: 50px;
  margin-left: 180px;

  @media (max-width: 767px) {
    margin: 0;
    width: 100%;
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
