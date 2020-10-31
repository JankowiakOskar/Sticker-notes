import React, { useRef } from 'react';
import styled from 'styled-components';
import KebabButton from 'components/atoms/KebabButton/KebabButton';
import { connect } from 'react-redux';
import { deleteItem as deleteItemAction, showModal as showModalAction } from 'actions';
import useOutsideclick from 'hooks/useOutsideclick';

const Wrapper = styled.div``;

const MenuWrapper = styled.nav`
  position: absolute;
  top: -50px;
  right: -15px;
  width: 150px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  border: 1px solid ${({ theme }) => theme.dark};
  z-index: 99999;
`;

const MenuList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const MenuElement = styled.li`
  position: relative;
  padding: 15px 35px;
  max-height: 50px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.m};
  border-bottom: 1px solid ${({ theme }) => theme.lightgrey};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.lightgrey};
  }

  

  &:after {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    content: '${({ icon }) => icon}';
    font-size: ${({ theme }) => theme.fontSizes.m};
    width: 40px;
    height: 100%;
    top: 50%;
    left: 0px;
    transform: translate(0, -50%);
  }
`;

const KebabMenu = ({ itemID, className, showModal, openCard }) => {
  const wrapperRef = useRef(null);
  const { isOpen, setOpen } = useOutsideclick(wrapperRef);
  const menuList = [
    { item: 'Otwórz', icon: '📂', action: () => openCard() },
    { item: 'Edytuj', icon: '✍', action: () => showModal('edit', itemID) },
    { item: 'Usuń', icon: '❌', action: () => showModal('delete', itemID) },
  ];

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(!isOpen);
  };

  return (
    <Wrapper ref={wrapperRef} onClick={handleClick} className={className}>
      <KebabButton />
      {isOpen && (
        <MenuWrapper>
          <MenuList>
            {menuList.map(({ item, icon, action }) => (
              <MenuElement icon={icon} key={item} onClick={action}>
                {item}
              </MenuElement>
            ))}
          </MenuList>
        </MenuWrapper>
      )}
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (itemType, id) => dispatch(deleteItemAction(itemType, id)),
  showModal: (typeModal, id) => dispatch(showModalAction(typeModal, id)),
});

export default connect(null, mapDispatchToProps)(KebabMenu);
