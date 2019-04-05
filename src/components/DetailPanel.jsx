import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactiveList } from '@appbaseio/reactivesearch';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import FieldList from './FieldList';
import ImageGallery from './ImageGallery';
import ReactiveSampleListContainer from '../containers/ReactiveSampleListContainer';
import SampleIndexContainer from '../containers/SampleIndexContainer';
import config from '../config';
import styles from '../../styles/cspace/DetailPanel.css';
import linkStyles from '../../styles/cspace/Link.css';

const propTypes = {
  isFromSearch: PropTypes.bool,
  searchParams: PropTypes.string,
  selectedInstitution: PropTypes.string,
  shortID: PropTypes.string.isRequired,
  sortField: PropTypes.string,
};

const defaultProps = {
  isFromSearch: false,
  searchParams: null,
  selectedInstitution: null,
  sortField: null,
};

export default class DetailPanel extends Component {
  constructor() {
    super();

    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    const result = data[0];

    if (!result) {
      return undefined;
    }

    const {
      'collectionspace_denorm:mediaCsid': mediaCsids,
      'collectionspace_denorm:title': title,
      'collectionspace_core:refName': refName,
      'materials_common:description': description,
      'materials_common:materialTermGroupList': materialTermGroups,
    } = result;

    const altName = materialTermGroups
      && materialTermGroups.length > 1
      && materialTermGroups[1].termDisplayName;

    const detailFields = config.get('materialDetailFields');

    return (
      <div className={styles.common}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <header>
          {this.renderSearchLink()}
          <h1>{title}</h1>
          {altName && <h2>{altName}</h2>}
        </header>

        <SampleIndexContainer materialRefName={refName} />

        {description && <p>{description}</p>}

        <section>
          <ImageGallery mediaCsids={mediaCsids} />

          <FieldList
            style={{ gridArea: 'fields0' }}
            data={result}
            fields={detailFields[0]}
            recordType="Materialitem"
          />

          <FieldList
            style={{ gridArea: 'fields1' }}
            data={result}
            fields={detailFields[1]}
            recordType="Materialitem"
          />
        </section>

        {this.renderSampleLists(refName)}
      </div>
    );
  }

  renderSearchLink() {
    const {
      isFromSearch,
      searchParams,
    } = this.props;

    if (!isFromSearch) {
      return null;
    }

    return (
      <nav>
        <Link
          className={linkStyles.back}
          to={{
            pathname: '/search',
            search: searchParams,
          }}
        >
          Return to search
        </Link>
      </nav>
    );
  }

  renderSampleLists(materialRefName) {
    const { selectedInstitution } = this.props;
    const institutions = config.get('institutions');

    return Object.keys(institutions).map((institutionId) => {
      const {
        title,
        esIndexName,
        gatewayUrl,
      } = institutions[institutionId];

      return (
        <ReactiveSampleListContainer
          esIndexName={esIndexName}
          gatewayUrl={gatewayUrl}
          institutionId={institutionId}
          isSelected={institutionId === selectedInstitution}
          key={institutionId}
          materialRefName={materialRefName}
          title={title}
        />
      );
    });
  }

  render() {
    const {
      shortID,
      sortField,
    } = this.props;

    return (
      <ReactiveList
        componentId="detail"
        dataField={sortField}
        defaultQuery={() => ({
          bool: {
            must: [
              { term: { 'ecm:primaryType': 'Materialitem' } },
              { term: { 'materials_common:shortIdentifier': shortID } },
            ],
          },
        })}
        onAllData={this.handleData}
        showResultStats={false}
        size={1}
      />
    );
  }
}

DetailPanel.propTypes = propTypes;
DetailPanel.defaultProps = defaultProps;
