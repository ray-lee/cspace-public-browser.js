import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactiveList } from '@appbaseio/reactivesearch';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import FieldList from './FieldList';
import ImageGalleryContainer from '../containers/ImageGalleryContainer';
import ReactiveSampleListContainer from '../containers/ReactiveSampleListContainer';
import SampleIndexContainer from '../containers/SampleIndexContainer';
import { renderJoined } from '../helpers/formatHelpers';
import config from '../config';
import styles from '../../styles/cspace/DetailPanel.css';
import linkStyles from '../../styles/cspace/Link.css';

const renderAltNames = (materialTermGroups) => {
  if (materialTermGroups.length > 1) {
    const displayNames = materialTermGroups
      .slice(1)
      .map((termGroup) => {
        const {
          termDisplayName,
          historicalStatus,
        } = termGroup;

        return (termDisplayName + (historicalStatus ? ' (formerly known as)' : ''));
      });

    return <h2>{renderJoined(displayNames, '\n')}</h2>;
  }

  return null;
};

const propTypes = {
  csid: PropTypes.string.isRequired,
  isFromSearch: PropTypes.bool,
  searchParams: PropTypes.string,
  selectedInstitution: PropTypes.string,
  sortField: PropTypes.string,
  setMaterialMedia: PropTypes.func,
};

const defaultProps = {
  isFromSearch: false,
  searchParams: null,
  selectedInstitution: null,
  sortField: null,
  setMaterialMedia: undefined,
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
      setMaterialMedia,
    } = this.props;

    const {
      'collectionspace_denorm:mediaCsid': mediaCsids,
      'collectionspace_denorm:title': title,
      'collectionspace_core:refName': refName,
      'materials_common:description': description,
      'materials_common:materialTermGroupList': materialTermGroups,
    } = result;

    setMaterialMedia(refName, null, mediaCsids);

    const detailFields = config.get('materialDetailFields');

    return (
      <div className={styles.common}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <header>
          {this.renderSearchLink()}
          <h1>{title}</h1>
          {renderAltNames(materialTermGroups)}
        </header>

        <SampleIndexContainer materialRefName={refName} />

        {description && <p>{description}</p>}

        <section>
          <ImageGalleryContainer materialRefName={refName} />

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
      csid,
      sortField,
    } = this.props;

    return (
      <ReactiveList
        componentId="detail"
        dataField={sortField}
        defaultQuery={() => ({
          term: { 'ecm:name': csid },
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
