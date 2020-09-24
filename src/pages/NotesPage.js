import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GridTemplate from 'templates/GridTemplate';
import CardNote from 'components/molecules/CardNote/CardNote';
import { connect } from 'react-redux';
import { getItems as getItemsAction } from 'actions';

const NotesPage = ({ allNotes, getItems }) => {
  // useEffect(() => {
  //   getItems('notes');
  // }, []);

  return (
    <GridTemplate headingTitle="Twoje notatki" notes={allNotes}>
      {allNotes.map(({ _id, note_title, note_content, favoriteNote, createdAt, note_file }) => (
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
    </GridTemplate>
  );
};

const mapStateToProps = (state) => {
  return {
    allNotes: state.data.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: (itemType) => dispatch(getItemsAction(itemType)),
  };
};

NotesPage.propTypes = {
  getItems: PropTypes.func.isRequired,
  allNotes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      note_title: PropTypes.string.isRequired,
      note_content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      favoriteNote: PropTypes.bool.isRequired,
    }),
  ),
};

NotesPage.defaultProps = {
  allNotes: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);
