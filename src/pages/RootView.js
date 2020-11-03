import React from 'react';
import MainTemplate from 'templates/MainTemplate';
import NotesPage from 'pages/NotesPage';
import NoteDetailPage from 'pages/NoteDetailPage';
import FavoriteNotesPage from 'pages/FavoriteNotesPage';
import AuthPage from 'pages/AuthPage';
import routes from 'routes';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'providers/PrivateRoute';

const Root = () => {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/notes" />} />
          <PrivateRoute exact path="/notes" component={NotesPage} />
          <PrivateRoute path="/favoritenotes" component={FavoriteNotesPage} />
          <PrivateRoute path="/notes/:id" component={NoteDetailPage} />
          <Route path={[routes.login, routes.register]} component={AuthPage} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

export default Root;
