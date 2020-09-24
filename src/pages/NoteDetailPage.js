import React from 'react';
import PropTypes from 'prop-types';
import NoteDetailTemplate from 'templates/NoteDetailTemplate';
import UserTemplate from 'templates/UserTemplate';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const NotePage = ({ matchedNote }) => {
  return (
    <UserTemplate>
      {matchedNote.length &&
        matchedNote.map(({ id, note_title, note_content, createdAt, note_file }) => (
          <NoteDetailTemplate
            id={id}
            title={note_title}
            content={note_content}
            createdAt={createdAt}
            photoUrl={note_file && note_file.url}
          />
        ))}
    </UserTemplate>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    matchedNote: state.data.notes.filter((note) => note.id === id),
  };
};

NotePage.propTypes = {
  matchedNote: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    note_title: PropTypes.string.isRequired,
    note_content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(withRouter(NotePage));
