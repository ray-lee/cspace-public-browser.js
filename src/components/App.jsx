import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import config from '../config';
import RootPage from './RootPage';

export default function App() {
  const basename = config.get('basename');

  return (
    <Router basename={basename}>
      <Switch>
        <Redirect exact path="/" to="/search" />
        <Route component={RootPage} />
      </Switch>
    </Router>
  );
}
