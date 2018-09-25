import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactiveList } from '@appbaseio/reactivesearch';
import Helmet from 'react-helmet';
import FieldList from './FieldList';
import ImageGallery from './ImageGallery';
import SampleListContainer from '../containers/SampleListContainer';
import config from '../config';
import styles from '../../styles/cspace/DetailPanel.css';

const propTypes = {
  shortID: PropTypes.string.isRequired,
  sortField: PropTypes.string,
};

const defaultProps = {
  sortField: null,
};

export default class DetailPanel extends Component {
  constructor() {
    super();

    this.handleData = this.handleData.bind(this);
  }

  renderSampleLists(materialRefName) {
    const institutions = config.get('institutions');

    return Object.keys(institutions).map(institutionId => {
      const {
        title,
        esIndexName,
        gatewayUrl,
      } = institutions[institutionId];

      return (
        <SampleListContainer
          esIndexName={esIndexName}
          gatewayUrl={gatewayUrl}
          institutionId={institutionId}
          key={institutionId}
          materialRefName={materialRefName}
          title={title}
        />
      );
    });
  }

  handleData(data) {
    const result = data[0];

    if (!result) {
      return undefined;
    }

    const {
      'collectionspace_denorm:blobCsid': blobCsids,
      'collectionspace_denorm:title': title,
      'collectionspace_core:refName': refName,
      'materials_common:description': description,
      'materials_common:materialTermGroupList': materialTermGroups,
      'materials_common:externalUrlGroupList': urlGroups,
    } = result;

    const altName =
      materialTermGroups &&
      materialTermGroups.length > 1 &&
      materialTermGroups[1].termDisplayName;

    const subtitle = altName && <h2>{altName}</h2>;

    return (
      <div className={styles.common}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <header>
          <h1>{title}</h1>
          {subtitle}
        </header>

        <main>
          <section>
            <div>
              <ImageGallery blobCsids={blobCsids} />
            </div>
          </section>

          <section>
            {description && <p>{description}</p>}

            <FieldList
              data={result}
              fields={config.get('materialDetailFields')}
            />
          </section>
        </main>

        {this.renderSampleLists(refName)}
      </div>
    );
  };

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
