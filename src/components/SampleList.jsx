import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { ReactiveList } from '@appbaseio/reactivesearch';

const messages = {
  title: {
    id: 'sampleList.title',
    defaultMessage: `{count, number} {count, plural,
      one {sample}
      other {samples}
    } at Test Institution`},
};

const propTypes = {
  materialRefName: PropTypes.string.isRequired,
};

const renderResult = (result) => {
  const {
    'collectionobjects_common:objectNumber': objectNumber,
  } = result;

  return (
    <li>
      {objectNumber}
    </li>
  );
};

const handleData = (results) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div>
      <h2><FormattedMessage {...messages.title} values={{ count: results.length }} /></h2>

      <ul>
        {results.map(result => renderResult(result))}
      </ul>
    </div>
  );
};

export default function SampleList(props) {
  const { materialRefName } = props;
  const sortField = 'collectionobjects_common:objectNumber';

  return (
    <ReactiveList
      // className={styles.common}
      componentId={materialRefName}
      dataField={sortField}
      defaultQuery={() => ({
        bool: {
          must: [
            {
              term: {
                'ecm:primaryType': 'CollectionObject',
              },
            },
            {
              term: {
                'collectionobjects_common:materialGroupList.material': materialRefName,
              },
            },
          ],
        },
      })}
      onAllData={handleData}
      showResultStats={false}
      size={500}
      sortBy="asc"
    />
  );
}

SampleList.propTypes = propTypes;
