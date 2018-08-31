import React from 'react';
import { Route, Switch } from 'react-router';
import Helmet from 'react-helmet';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import DetailPage from './DetailPage';
import SearchPage from './SearchPage';
import config from '../config';
import styles from '../../styles/cspace/RootPage.css';

export default function RootPage() {
  const title = 'Material Order';

  const esIndexName = config.get('esIndexName');
  const gatewayUrl = config.get('gatewayUrl');

  return (
    <div className={styles.common}>
      <Helmet
        defaultTitle={title}
        titleTemplate={`%s | ${title}`}
      />

      <ReactiveBase
        app={esIndexName}
        type="doc"
        credentials=""
        url={`${gatewayUrl}/es`}
        theme={{
          typography: {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
          },
          colors: {
            textColor: '#424242',
            primaryTextColor: '#fff',
            primaryColor: '#424242',
            titleColor: '#424242',
            alertColor: '#d9534f',
          },
          component: {
            margin: 0,
          },
        }}
      >
        <Switch>
          <Route path="/materials" component={SearchPage} />
          <Route path="/material/:shortID" component={DetailPage} />
        </Switch>
      </ReactiveBase>
    </div>
  );
}
