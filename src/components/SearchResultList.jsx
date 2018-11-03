import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import warning from 'warning';
import { ReactiveList, ResultList } from '@appbaseio/reactivesearch';
import { ReactiveMap } from '@appbaseio/reactivemaps';
import { LIST, MAP, TILE } from '../constants/viewTypes';
import { blobUrl } from '../helpers/urlHelpers';
import styles from '../../styles/cspace/SearchResultList.css';
import statsStyles from '../../styles/cspace/SearchResultStats.css';
import tileStyles from '../../styles/cspace/SearchResultTile.css';
import cssDimensions from '../../styles/dimensions.css';

const propTypes = {
  advancedSearchFields: PropTypes.arrayOf(PropTypes.object),
  filterIds: PropTypes.arrayOf(PropTypes.string),
  gatewayUrl: PropTypes.string.isRequired,
  searchEntryId: PropTypes.string,
  types: PropTypes.object.isRequired,
  view: PropTypes.string,
};

const defaultProps = {
  advancedSearchFields: [],
  filterIds: [],
  searchEntryId: 'search',
  searchParams: null,
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

const getResultUrl = (result) => {
  const shortID = get(result, 'materials_common:shortIdentifier');

  return (shortID ? `/material/${shortID}` : undefined);
};

export default class SearchResultPanel extends Component {
  constructor() {
    super();

    this.handleData = this.handleData.bind(this);
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

  getPageSize() {
    let width;
    let height;
    let ratio;

    width = window.innerWidth;
    height = window.innerHeight;
    ratio = window.devicePixelRatio || 1;

    const {
      searchResultTileWidth: cssTileWidth,
      searchResultTileBodyHeight: cssTileBodyHeight,
    } = cssDimensions;

    const tileWidth = parseInt(cssTileWidth, 10);
    const tileBodyHeight = parseInt(cssTileBodyHeight, 10);
    const tileHeight = tileWidth + tileBodyHeight;

    const pageSize = (width / tileWidth) * (height / tileHeight + 2) / ratio;

    return Math.max(Math.ceil(pageSize), 12);
  }

  handleData(result) {
    const {
      gatewayUrl,
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

    const blobCsid = get(result, ['collectionspace_denorm:blobCsid', 0]);
    const imageUrl = blobCsid && blobUrl(gatewayUrl, blobCsid, 'OriginalJpeg');

    return {
      title,
      description,
      image: imageUrl,
      url: getResultUrl(result),
    };
  }

  renderResult(result) {
    const data = this.handleData(result);

    return (
      <Link
        className={tileStyles.common}
        key={data.url}
        to={{
          pathname: data.url,
          state: {
            isFromSearch: true,
            searchParams: window.location.search,
          },
        }}
      >
        <div style={{ backgroundImage: `url(${data.image})` }} />

        <article>
          <h2>{data.title}</h2>
          {data.description}
        </article>
      </Link>
    )
  }

  renderTileView(props) {
    const size = this.getPageSize();

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
        onData={this.renderResult}
        onNoResults={noResults}
        onResultStats={renderResultStats}
        {...props}
      />

      // <ResultCard
      //   className={styles.common}
      //   innerClass={{
      //     list: 'cspace-SearchResultListBody',
      //     listItem: 'cspace-SearchResultListItem',
      //     image: 'cspace-SearchResultListImage',
      //     resultsInfo: 'cspace-SearchResultListResultsInfo',
      //     title: 'cspace-SearchResultListTitle',
      //   }}
      //   react={{ and: this.getSensorIds() }}
      //   onData={this.handleData}
      //   onNoResults={noResults}
      //   onResultStats={renderResultStats}
      //   {...props}
      // />
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

  renderMapView(props) {
    return (
      <ReactiveMap
        autoCenter
        className={styles.common}
        dataField="collectionspace_denorm:geoPoint"
        defaultCenter={{ lat: 39.83, lng: -98.58 }}
        defaultZoom={4}
        title="Map"
        react={{ and: this.getSensorIds() }}
        // onNoResults={noResults}
        // onResultStats={renderResultStats}
        {...props}
      />
    );
  }

  render() {
    const {
      view,
      ...remainingProps
    } = this.props;

    switch (view) {
      case TILE: return this.renderTileView(remainingProps);
      case LIST: return this.renderListView(remainingProps);
      case MAP: return this.renderMapView(remainingProps);
      default: return null;
    }
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
