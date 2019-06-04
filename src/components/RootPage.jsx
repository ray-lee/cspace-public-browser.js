import React from 'react';
import { Route, Switch } from 'react-router';
import Helmet from 'react-helmet';
import DetailPage from './DetailPage';
import SearchResultPageContainer from '../containers/SearchResultPageContainer';
import withReactiveBase from '../enhancers/withReactiveBase';
import styles from '../../styles/cspace/RootPage.css';

export default function RootPage() {
  const title = 'Material Order';

  return (
    <div className={styles.common}>
      <Helmet
        defaultTitle={title}
        titleTemplate={`%s | ${title}`}
      >
        <meta name="viewport" content="width=device-width" />
      </Helmet>

      <Switch>
        <Route path="/search" component={withReactiveBase(SearchResultPageContainer)} />
        <Route path="/material/:csid" component={withReactiveBase(DetailPage)} />
      </Switch>
    </div>
  );
}
