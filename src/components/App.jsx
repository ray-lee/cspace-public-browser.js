import React, { Component } from 'react';
import { ReactiveBase} from '@appbaseio/reactivesearch';
import config from '../config';
import FilteredSearchResultPanel from './FilteredSearchResultPanel';
import SearchEntryPanel from './SearchEntryPanel';
import styles from '../../styles/cspace/App.css';

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    const defaultQuery = config.get('defaultQuery');
    const filters = config.get('filters');
    const esIndexName = config.get('esIndexName');
    const gatewayUrl = config.get('gatewayUrl');
    const sortField = config.get('sortField');
    const types = config.get('types');

    return (
      <ReactiveBase
        app={esIndexName}
        className={styles.common}
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
            primaryColor: '#0B6AFF',
            titleColor: '#424242',
            alertColor: '#d9534f',
          },
        }}
      >
        <SearchEntryPanel />

        <FilteredSearchResultPanel
          defaultQuery={defaultQuery}
          filters={filters}
          gatewayUrl={gatewayUrl}
          sortField={sortField}
          types={types}
        />
      </ReactiveBase>
    );
  }
}
