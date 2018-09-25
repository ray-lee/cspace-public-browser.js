import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { ReactiveList } from '@appbaseio/reactivesearch';
import { getItemShortID } from 'cspace-refname';
import FieldList from './FieldList';
import PanelTitle from './PanelTitle';
import ImageGallery from './ImageGallery';
import config from '../config';
import withReactiveBase from '../enhancers/withReactiveBase';
import styles from '../../styles/cspace/SampleList.css';

const messages = defineMessages({
  title: {
    id: 'sampleList.title',
    defaultMessage: `{count, number} {count, plural,
      one {sample}
      other {samples}
    } at {title}`},
});

const propTypes = {
  institutionId: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  materialRefName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  togglePanel: PropTypes.func,
};

const defaultProps = {
  isExpanded: false,
  togglePanel: undefined,
};

const renderResult = (result) => {
  const {
    'collectionspace_core:uri': uri,
    'collectionobjects_common:objectNumber': objectNumber,
  } = result;

  return (
    <li key={uri}>
      <h4>{objectNumber}</h4>

      <FieldList
        data={result}
        fields={config.get('sampleDetailFields')}
      />
    </li>
  );
};

class SampleList extends Component {
  constructor() {
    super();

    this.handleMaterialData = this.handleMaterialData.bind(this);
    this.handleSampleData = this.handleSampleData.bind(this);
  }

  handleMaterialData(data) {
    const result = data[0];

    if (!result) {
      return undefined;
    }

    const {
      'collectionspace_denorm:blobCsid': blobCsids,
    } = result;

    return (
      <ImageGallery blobCsids={blobCsids} />
    );
  }

  handleSampleData(results) {
    if (results.length === 0) {
      return null;
    }

    const {
      institutionId,
      isExpanded,
      materialRefName,
      title,
      togglePanel,
    } = this.props;

    const shortID = getItemShortID(materialRefName);

    let content = null;

    if (isExpanded) {
      content = (
        <div>
          <ReactiveList
            componentId={`${institutionId}_images`}
            dataField={config.get('sortField')}
            defaultQuery={() => ({
              bool: {
                must: [
                  { term: { 'ecm:primaryType': 'Materialitem' } },
                  { term: { 'materials_common:shortIdentifier': shortID } },
                ],
              },
            })}
            onAllData={this.handleMaterialData}
            showResultStats={false}
            size={1}
          />

          <ul>
            {results.map(result => renderResult(result))}
          </ul>
        </div>
      );
    }

    const titleMessage = (
      <FormattedMessage
        {...messages.title}
        tagName="h2"
        values={{
          title,
          count: results.length,
        }}
      />
    );

    return (
      <section
        className={isExpanded ? styles.expanded : styles.collapsed}
      >
        <PanelTitle isExpanded={isExpanded} title={titleMessage} onClick={togglePanel} />
        {content}
      </section>
    );
  };

  render() {
    const {
      institutionId,
      materialRefName,
    } = this.props;

    return (
      <ReactiveList
        componentId={institutionId}
        dataField="collectionobjects_common:objectNumber"
        defaultQuery={() => ({
          bool: {
            must: [
              { term: { 'ecm:primaryType': 'CollectionObject' } },
              { term: { 'collectionobjects_common:materialGroupList.material': materialRefName } },
            ],
          },
        })}
        loader={<div />}
        onAllData={this.handleSampleData}
        onNoResults={null}
        showResultStats={false}
        size={500}
        sortBy="asc"
      />
    );
  }
}

SampleList.propTypes = propTypes;
SampleList.defaultProps = defaultProps;

export default withReactiveBase(SampleList);
