/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { getItemShortID } from 'cspace-refname';
import { ReactiveList } from '@appbaseio/reactivesearch';
import FieldList from './FieldList';
import PanelTitle from './PanelTitle';
import ImageGallery from './ImageGallery';
import config from '../config';
import styles from '../../styles/cspace/SampleList.css';

const messages = defineMessages({
  title: {
    id: 'sampleList.title',
    defaultMessage: 'Samples at {title}',
  },
});

const propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({
    _source: PropTypes.shape({
      'collectionspace_core:uri': PropTypes.string,
    }),
  })),
  institutionId: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  isSelected: PropTypes.bool,
  materialRefName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  expandPanel: PropTypes.func,
  togglePanel: PropTypes.func,
  onSamplesLoaded: PropTypes.func,
};

const defaultProps = {
  hits: [],
  isExpanded: false,
  isSelected: false,
  expandPanel: undefined,
  togglePanel: undefined,
  onSamplesLoaded: undefined,
};

const renderMaterialImages = (data) => {
  const result = data[0];

  if (!result) {
    return undefined;
  }

  const {
    'collectionspace_denorm:mediaCsid': mediaCsids,
  } = result;

  return (
    <ImageGallery mediaCsids={mediaCsids} />
  );
};

const renderResult = (result) => {
  const {
    'collectionspace_core:uri': uri,
  } = result;

  return (
    <li key={uri}>
      <FieldList
        data={result}
        fields={config.get('sampleDetailFields')}
        recordType="CollectionObject"
      />
    </li>
  );
};

export default class SampleList extends Component {
  constructor() {
    super();

    this.handleRef = this.handleRef.bind(this);
  }

  handleRef(ref) {
    const {
      isSelected,
      expandPanel,
    } = this.props;

    if (ref && isSelected) {
      window.setTimeout(() => {
        if (expandPanel) {
          expandPanel();
        }

        ref.scrollIntoView();
      }, 0);
    }
  }

  render() {
    const { hits } = this.props;
    // eslint-disable-next-line no-underscore-dangle
    const results = hits.map(hit => hit._source);

    if (results.length === 0) {
      return null;
    }

    const {
      institutionId,
      isExpanded,
      materialRefName,
      title,
      togglePanel,
      onSamplesLoaded,
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
            onAllData={renderMaterialImages}
            showResultStats={false}
            size={1}
          />

          <ul>
            {results.map(result => renderResult(result))}
          </ul>
        </div>
      );
    }

    const countMessage = (
      <FormattedMessage
        {...messages.title}
        tagName="h2"
        values={{
          title,
          count: results.length,
        }}
      />
    );

    if (onSamplesLoaded) {
      onSamplesLoaded({
        institutionId,
        count: results.length,
      });
    }

    return (
      <section
        className={isExpanded ? styles.expanded : styles.collapsed}
        id={institutionId}
        ref={this.handleRef}
      >
        <PanelTitle isExpanded={isExpanded} title={countMessage} onClick={togglePanel} />
        {content}
      </section>
    );
  }
}

SampleList.propTypes = propTypes;
SampleList.defaultProps = defaultProps;
