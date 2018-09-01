import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactiveList } from '@appbaseio/reactivesearch';
import Helmet from 'react-helmet';
import SampleList from './SampleList';
import styles from '../../styles/cspace/DetailPanel.css';

const propTypes = {
  shortID: PropTypes.string.isRequired,
  sortField: PropTypes.string,
};

const defaultProps = {
  sortField: null,
};

const handleData = (data) => {
  const result = data[0];

  if (!result) {
    return undefined;
  }

  const {
    'collectionspace_denorm:title': title,
    'collectionspace_core:refName': refName,
    'materials_common:description': description,
    'materials_common:materialTermGroupList': materialTermGroups,
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

      <h1>{title}</h1>
      {subtitle}

      {description && <p>{description}</p>}

      <SampleList materialRefName={refName} />
    </div>
  );
};

export default class DetailPanel extends Component {
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
              {
                term: {
                  'ecm:primaryType': 'Materialitem',
                },
              },
              {
                term: {
                  'materials_common:shortIdentifier': shortID,
                },
              },
            ],
          },
        })}
        onAllData={handleData}
        showResultStats={false}
        size={1}
      />
    );
  }
}

DetailPanel.propTypes = propTypes;
DetailPanel.defaultProps = defaultProps;
