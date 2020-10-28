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
  width: 90%;
  min-height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 25px;

  @media (max-width: 1600px) {
    width: 80%;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1175px) {
    padding: 10px;
    width: 100%;
    grid-template-columns: 1fr;
  }
`;

const StyledEmptyWrapper = styled.div`
  margin: 50px 200px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.8;

  @media (max-width: 767px) {
    margin: 0;
    height: 300px;
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
  padding: 30px 0;

  @media (max-width: 767px) {
    padding: 20px 10px 30px;
  }
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 5px 5px;
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  background-color: ${({ theme, favoritetype }) => favoritetype && theme.red};
`;

const StyledHeading = styled(Heading)`
  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
`;

const GridTemplate = ({ children, notes, headingTitle, favoritetype }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedItems, setSearchedItems] = useState([]);
  const headerRef = useRef(null);

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

      tl.from([headerTitle, countNotes, searchInput], { autoAlpha: 0, stagger: 0.05 });
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
      <StyledEmptyWrapper>
        <EmptyBackGround />
        <StyledHeading>
          Nie znajduję notatki...
          <span aria-label="note_emoji" role="img">
            📝
          </span>
        </StyledHeading>
        <StyledParagraph size="m">{`o nazwie: "${searchValue}"`}</StyledParagraph>
      </StyledEmptyWrapper>
    );
  };

  return (
    <UserTemplate>
      <StyledHeader ref={headerRef}>
        <StyledHeading data-id="headerTitle">{headingTitle}</StyledHeading>
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
        <StyledEmptyWrapper>
          <EmptyBackGround />
          <StyledHeading>
            {favoritetype ? 'Brak ulubionych notatek...' : 'Brak notatek...'}
            <span aria-label="note_emoji" role="img">
              📝
            </span>
          </StyledHeading>
          <StyledParagraph size="m">
            {searchValue
              ? `Brak wyszukiwanej treści: "${searchValue}"`
              : 'Proponuję dodać kilka nowych.'}
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
