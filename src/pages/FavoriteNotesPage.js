import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GridTemplate from 'templates/GridTemplate';
import CardNote from 'components/molecules/CardNote/CardNote';
import { connect } from 'react-redux';
import { PageContext } from 'contexts';

const FavoriteNotesPage = ({ favoriteNotes }) => {
  const pageType = useContext(PageContext);
  return (
    <GridTemplate
      headingTitle="Twoje ulubione notatki"
      notes={favoriteNotes}
      favoritetype={pageType}
    >
      {favoriteNotes.map(
        ({ _id, note_title, note_content, createdAt, favoriteNote, note_file }) => (
          <CardNote
            key={_id}
            id={_id}
            title={note_title}
            content={note_content}
            createdAt={createdAt}
            favoriteNote={favoriteNote}
            photoUrl={note_file && note_file.url}
          />
        ),
      )}
    </GridTemplate>
  );
};

FavoriteNotesPage.propTypes = {
  favoriteNotes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      note_title: PropTypes.string,
      note_content: PropTypes.string,
      createdAt: PropTypes.string,
      favoriteNote: PropTypes.bool,
    }),
  ),
};

FavoriteNotesPage.defaultProps = {
  favoriteNotes: [],
};

const mapStateToProps = (state) => ({
  favoriteNotes: state.data.notes.filter((note) => note.favoriteNote === true),
});
export default connect(mapStateToProps, null)(FavoriteNotesPage);
