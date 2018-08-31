import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import warning from 'warning';
import { ResultCard, ResultList } from '@appbaseio/reactivesearch';
import { ReactiveMap } from '@appbaseio/reactivemaps';
import { LIST, MAP, TILE } from '../constants/viewTypes';
import styles from '../../styles/cspace/SearchResultList.css';
import statsStyles from '../../styles/cspace/SearchResultStats.css';

const propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  gatewayUrl: PropTypes.string.isRequired,
  searchEntryId: PropTypes.string,
  sortField: PropTypes.string,
  types: PropTypes.object.isRequired,
  view: PropTypes.string,
};

const defaultProps = {
  filters: [],
  searchEntryId: 'search',
  sortField: null,
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
  }

  getSensorIds() {
    const {
      filters,
      searchEntryId,
    } = this.props;

    return [searchEntryId, ...filters.map(filter => filter.id)];
  }

  getSortOptions() {
    const {
      sortField,
    } = this.props;

    if (sortField) {
      return [
        {
          label: 'Best match',
          dataField: '_score',
          sortBy: 'desc',
        },
        {
          label: 'A to Z',
          dataField: sortField,
          sortBy: 'asc',
        },
        {
          label: 'Z to A',
          dataField: sortField,
          sortBy: 'desc',
        },
      ];
    }

    return undefined;
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

    const imageUrl = blobCsid
      ? `${gatewayUrl}/cspace-services/blobs/${blobCsid}/derivatives/Medium/content`
      : null;

    return {
      title,
      description,
      image: imageUrl,
      url: getResultUrl(result),
    };
  }

  renderTileView(props) {
    const {
      sortField,
    } = props;

    return (
      <ResultCard
        className={styles.common}
        dataField={sortField}
        innerClass={{
          list: 'cspace-SearchResultListBody',
          listItem: 'cspace-SearchResultListItem',
          image: 'cspace-SearchResultListImage',
          resultsInfo: 'cspace-SearchResultListResultsInfo',
          sortOptions: 'cspace-SearchResultListSortOptions',
          title: 'cspace-SearchResultListTitle',
        }}
        react={{ and: this.getSensorIds() }}
        sortOptions={this.getSortOptions()}
        onData={this.handleData}
        onNoResults={noResults}
        onResultStats={renderResultStats}
        {...props}
      />
    );
  }

  renderListView(props) {
    const {
      sortField,
    } = props;

    return (
      <ResultList
        className={styles.common}
        dataField={sortField}
        react={{ and: this.getSensorIds() }}
        sortOptions={this.getSortOptions()}
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
