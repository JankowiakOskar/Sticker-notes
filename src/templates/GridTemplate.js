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
  padding: 0 10px;
  grid-gap: 25px;

  @media (max-width: 1600px) {
    width: 80%;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1175px) {
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
  opacity: 0.7;

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
  background-color: ${({ theme, favoriteType }) => favoriteType && theme.red};
`;

const StyledHeading = styled(Heading)`
  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
`;

const GridTemplate = ({ children, notes, headingTitle, favoriteType }) => {
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

  useEffect(() => {
    if (!searchValue.length) {
      setSearchedItems([]);
    }
  }, [searchValue]);

  return (
    <UserTemplate>
      <StyledHeader ref={headerRef}>
        <StyledHeading data-id="headerTitle">{headingTitle}</StyledHeading>
        <StyledParagraph data-id="countNotes" size="m" styled>
          Ilość {favoriteType ? 'ulubionych' : 'wszystkich'} notatek: {calcItems()}
        </StyledParagraph>
        <StyledInput
          data-id="searchInput"
          autoComplete="off"
          value={searchValue}
          placeholder="szukaj notatki..."
          secondary
          favoriteType={favoriteType}
          onChange={(e) => handleChange(e)}
        />
      </StyledHeader>
      {notes.length ? (
        <StyledGrid>
          {searchedItems.length
            ? searchedItems.map(({ _id, note_title, note_content, createdAt, favoriteNote }) => (
                <CardNote
                  key={_id}
                  id={_id}
                  title={note_title}
                  content={note_content}
                  createdAt={createdAt}
                  favoriteNote={favoriteNote}
                />
              ))
            : children}
        </StyledGrid>
      ) : (
        <StyledEmptyWrapper>
          <EmptyBackGround />
          <StyledHeading>
            {favoriteType ? 'Brak ulubionych notatek...' : 'Brak notatek...'}
          </StyledHeading>
          <StyledParagraph size="m">
            {searchValue
              ? `Brak wyszukiwanej treści: "${searchValue}"`
              : 'Dodaj kilka nowych notatek'}
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
  favoriteType: PropTypes.string,
};

GridTemplate.defaultProps = {
  notes: [],
  favoriteType: '',
};

export default GridTemplate;
