import React from 'react';
import { Route, Switch } from 'react-router';
import Helmet from 'react-helmet';
import DetailPage from './DetailPage';
import SearchResultPageContainer from '../containers/SearchResultPageContainer';
import withReactiveBase from '../enhancers/withReactiveBase';
import styles from '../../styles/cspace/RootPage.css';

export default function RootPage(props) {
  const title = 'Material Order';

  return (
    <div className={styles.common}>
      <Helmet
        defaultTitle={title}
        titleTemplate={`%s | ${title}`}
      />

      <Switch>
        <Route path="/material/:shortID" component={withReactiveBase(DetailPage)} />
        <Route path="/material" component={withReactiveBase(SearchResultPageContainer)} />
      </Switch>
    </div>
  );
}
