/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import warning from 'warning';
import { ReactiveList, ResultList } from '@appbaseio/reactivesearch';
// import { ReactiveMap } from '@appbaseio/reactivemaps';
import SearchResultImage from './SearchResultImage';
import { LIST, TILE } from '../constants/viewTypes';
import styles from '../../styles/cspace/SearchResultList.css';
import statsStyles from '../../styles/cspace/SearchResultStats.css';
import tileStyles from '../../styles/cspace/SearchResultTile.css';
import cssDimensions from '../../styles/dimensions.css';

const propTypes = {
  advancedSearchFields: PropTypes.arrayOf(PropTypes.object),
  filterIds: PropTypes.arrayOf(PropTypes.string),
  gatewayUrl: PropTypes.string.isRequired,
  hits: PropTypes.shape({
    hits: PropTypes.arrayOf(PropTypes.object),
  }),
  query: PropTypes.shape({
    from: PropTypes.number,
    size: PropTypes.number,
  }),
  searchEntryId: PropTypes.string,
  types: PropTypes.objectOf(PropTypes.object).isRequired,
  view: PropTypes.string,
};

const defaultProps = {
  advancedSearchFields: [],
  filterIds: [],
  hits: undefined,
  query: undefined,
  searchEntryId: 'search',
  view: TILE,
};

const messages = defineMessages({
  noResults: {
    id: 'searchResultPanel.noResults',
    defaultMessage: 'No materials found',
  },
  resultStats: {
    id: 'searchResultPanel.resultStats',
    defaultMessage: `{total, number} {total, plural,
      one {material}
      other {materials}
    } found`,
  },
});

const renderResultStats = total => (
  <div className={statsStyles.common}>
    <FormattedMessage {...messages.resultStats} values={{ total }} />
  </div>
);

const noResults = <FormattedMessage {...messages.noResults} />;

const getPageSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = window.devicePixelRatio || 1;

  const {
    searchResultTileWidth: cssTileWidth,
    searchResultTileBodyHeight: cssTileBodyHeight,
  } = cssDimensions;

  const tileWidth = parseInt(cssTileWidth, 10);
  const tileBodyHeight = parseInt(cssTileBodyHeight, 10);
  const tileHeight = tileWidth + tileBodyHeight;

  const pageSize = (width / tileWidth) * (height / tileHeight + 2) / ratio;

  return Math.max(Math.ceil(pageSize), 12);
};

const getResultUrl = (result) => {
  const csid = get(result, 'ecm:name');

  return (csid ? `/material/${csid}` : undefined);
};

export default class SearchResultPanel extends Component {
  constructor() {
    super();

    this.handleData = this.handleData.bind(this);
    this.renderAllResults = this.renderAllResults.bind(this);
    this.renderResult = this.renderResult.bind(this);
  }

  getSensorIds() {
    const {
      advancedSearchFields,
      filterIds,
      searchEntryId,
    } = this.props;

    return [
      searchEntryId,
      ...advancedSearchFields.map(field => field.id),
      ...filterIds,
    ];
  }

  handleData(result) {
    const {
      types,
    } = this.props;

    const primaryType = get(result, 'ecm:primaryType');
    const type = get(types, primaryType);

    warning(
      type,
      `No data mapping is configured for the document type '${primaryType}'. The search result will not be rendered.`,
    );

    if (!type) {
      return null;
    }

    const {
      title: titleMapping,
      description: descriptionMapping,
    } = type;

    warning(
      titleMapping,
      `No title mapping is configured for the document type '${primaryType}'. The title will not be rendered.`,
    );

    warning(
      descriptionMapping,
      `No description mapping is configured for the record type '${primaryType}'. The description will not be rendered.`,
    );

    const title = titleMapping && titleMapping(result);

    let description = descriptionMapping && descriptionMapping(result);

    if (Array.isArray(description)) {
      description = (
        <React.Fragment>
          {description.map(line => <div key={line}>{line}</div>)}
        </React.Fragment>
      );
    }

    return {
      title,
      description,
      csid: get(result, 'ecm:name'),
      mediaCsid: get(result, ['collectionspace_denorm:mediaCsid', 0]),
      holdingInstitutions: get(result, 'collectionspace_denorm:holdingInstitutions'),
      shortID: get(result, 'materials_common:shortIdentifier'),
      url: getResultUrl(result),
    };
  }

  renderAllResults(results) {
    return (
      <div className="cspace-SearchResultListBody">
        {results.map((result, index) => this.renderResult(result, index))}
      </div>
    );
  }

  renderResult(result, index) {
    const {
      gatewayUrl,
      query,
    } = this.props;

    const data = this.handleData(result);

    return (
      <Link
        className={tileStyles.common}
        key={data.url}
        to={{
          pathname: data.url,
          state: {
            search: {
              index,
              query,
              params: window.location.search,
            },
          },
        }}
      >
        <SearchResultImage
          gatewayUrl={gatewayUrl}
          holdingInstitutions={data.holdingInstitutions}
          mediaCsid={data.mediaCsid}
          shortID={data.shortID}
        />

        <article>
          <h2>{data.title}</h2>
        </article>
      </Link>
    );
  }

  renderTileView(props) {
    const size = getPageSize();

    return (
      <ReactiveList
        className={styles.common}
        dataField=""
        innerClass={{
          list: 'cspace-SearchResultListBody',
          listItem: 'cspace-SearchResultListItem',
          image: 'cspace-SearchResultListImage',
          resultsInfo: 'cspace-SearchResultListResultsInfo',
          title: 'cspace-SearchResultListTitle',
        }}
        react={{ and: this.getSensorIds() }}
        size={size}
        onAllData={this.renderAllResults}
        // onData={this.renderResult}
        onNoResults={noResults}
        onResultStats={renderResultStats}
        {...props}
      />
    );
  }

  renderListView(props) {
    return (
      <ResultList
        className={styles.common}
        react={{ and: this.getSensorIds() }}
        onData={this.handleData}
        onNoResults={noResults}
        onResultStats={renderResultStats}
        {...props}
      />
    );
  }

  // renderMapView(props) {
  //   return (
  //     <ReactiveMap
  //       autoCenter
  //       className={styles.common}
  //       dataField="collectionspace_denorm:geoPoint"
  //       defaultCenter={{ lat: 39.83, lng: -98.58 }}
  //       defaultZoom={4}
  //       title="Map"
  //       react={{ and: this.getSensorIds() }}
  //       // onNoResults={noResults}
  //       // onResultStats={renderResultStats}
  //       {...props}
  //     />
  //   );
  // }

  render() {
    const {
      view,
      ...remainingProps
    } = this.props;

    switch (view) {
      case TILE: return this.renderTileView(remainingProps);
      case LIST: return this.renderListView(remainingProps);
      // case MAP: return this.renderMapView(remainingProps);
      default: return null;
    }
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
