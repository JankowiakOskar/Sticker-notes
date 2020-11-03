/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UserTemplate from 'templates/UserTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Input from 'components/atoms/Input/Input';
import CardNote from 'components/molecules/CardNote/CardNote';
import emptydata from 'assets/svg/emptydata.svg';
import gsap from 'gsap';
import { getArrNum } from 'utils';

const StyledGrid = styled.div`
  width: 95%;
  margin: 0 0 0 80px;
  min-height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 45px;

  @media (max-width: 1600px) {
    width: 85%;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1175px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 60px;
    margin: 30px 0 0 0;
    padding: 0px 20px 80px;
  }
`;

const StyledEmptyWrapper = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.8;

  @media (max-width: 767px) {
    margin: 0;
    height: 300px;
    width: 100%;
  }
`;

const EmptyBackGround = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 300px;
  background: url(${emptydata}) no-repeat center;
  background-size: 100%;

  @media (max-width: 767px) {
    background-size: 70%;
  }
`;

const StyledHeader = styled.div`
  padding: 30px 80px;

  @media (max-width: 767px) {
    padding: 30px 20px 0;
  }
`;

const StyledParagraph = styled(Paragraph)`
  padding: 5px 5px;
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  background-color: ${({ theme, favoritetype }) => favoritetype && theme.red};
  border-radius: 25px;
`;

const StyledHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSizes.mobileLarge};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const Emoji = styled.span`
  font-size: 2rem;
  margin: 0 0 0 10px;
`;

const GridTemplate = ({ children, notes, headingTitle, favoritetype }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedItems, setSearchedItems] = useState([]);
  const headerRef = useRef(null);
  const emptyItemRef = useRef(null);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (searchValue.length) {
      const upperValue = searchValue.toUpperCase();
      const matchedItems = notes.filter((note) => {
        const upperTitle = note.note_title.toUpperCase();
        return upperTitle.indexOf(upperValue) !== -1;
      });
      setSearchedItems([...matchedItems]);
    }
  };

  useEffect(() => {
    if (!searchValue.length) {
      setSearchedItems([]);
    }
  }, [searchValue]);

  const calcItems = () => {
    return searchedItems.length ? getArrNum(searchedItems) : getArrNum(notes);
  };

  useEffect(() => {
    if (headerRef) {
      const header = headerRef.current;
      const headerTitle = header.querySelector("[data-id='headerTitle'");
      const countNotes = header.querySelector("[data-id='countNotes'");
      const searchInput = header.querySelector("[data-id='searchInput'");
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      tl.from([headerTitle, countNotes, searchInput], { y: '-30', autoAlpha: 0, stagger: 0.05 });
    }
  }, []);

  useEffect(() => {
    if (emptyItemRef.current) {
      const emptyItem = emptyItemRef.current;
      gsap.fromTo(emptyItem, { y: '-=50', autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 });
    }
  }, []);

  const findCards = (arrCards) => {
    const anyCardExist = arrCards.length;
    return anyCardExist ? (
      <StyledGrid>
        {arrCards.map(({ _id, note_title, note_content, createdAt, favoriteNote, note_file }) => (
          <CardNote
            key={_id}
            id={_id}
            title={note_title}
            content={note_content}
            createdAt={createdAt}
            favoriteNote={favoriteNote}
            photoUrl={note_file && note_file.url}
          />
        ))}
      </StyledGrid>
    ) : (
      <StyledEmptyWrapper ref={emptyItemRef}>
        <EmptyBackGround />
        <StyledHeading size="l">
          Nie znajduję notatki...
          <Emoji aria-label="note_emoji" role="img">
            📝
          </Emoji>
        </StyledHeading>
        <StyledParagraph size="m">{`o nazwie: "${searchValue}"`}</StyledParagraph>
      </StyledEmptyWrapper>
    );
  };

  return (
    <UserTemplate>
      <StyledHeader ref={headerRef}>
        <Heading size="l" data-id="headerTitle">
          {headingTitle}
        </Heading>
        <StyledParagraph data-id="countNotes" size="m" styled>
          Ilość {favoritetype ? 'ulubionych' : 'wszystkich'} notatek: {calcItems()}
        </StyledParagraph>
        <StyledInput
          data-id="searchInput"
          autoComplete="off"
          value={searchValue}
          placeholder="szukaj notatki..."
          secondary
          favoritetype={favoritetype}
          onChange={(e) => handleChange(e)}
        />
      </StyledHeader>
      {notes.length ? (
        <>
          {!searchValue ? (
            <StyledGrid>{children}</StyledGrid>
          ) : (
            findCards(searchedItems, searchValue)
          )}
        </>
      ) : (
        <StyledEmptyWrapper ref={emptyItemRef}>
          <EmptyBackGround />
          <StyledHeading size="l">
            {favoritetype ? 'Brak ulubionych notatek...' : 'Brak notatek...'}
            <Emoji aria-label="note_emoji" role="img">
              📝
            </Emoji>
          </StyledHeading>
          <StyledParagraph size="m">
            {searchValue ? `Brak wyszukiwanej treści: "${searchValue}"` : 'Dodaj kilka nowych.'}
          </StyledParagraph>
        </StyledEmptyWrapper>
      )}
    </UserTemplate>
  );
};

GridTemplate.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      note_title: PropTypes.string,
      note_content: PropTypes.string,
      createdAt: PropTypes.string,
      favoriteNote: PropTypes.bool,
    }),
  ),
  children: PropTypes.instanceOf(Array).isRequired,
  headingTitle: PropTypes.string.isRequired,
  favoritetype: PropTypes.string,
};

GridTemplate.defaultProps = {
  notes: [],
  favoritetype: '',
};

export default GridTemplate;
