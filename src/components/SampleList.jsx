import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { ReactiveList } from '@appbaseio/reactivesearch';
import styles from '../../styles/cspace/SampleList.css';

const messages = defineMessages({
  title: {
    id: 'sampleList.title',
    defaultMessage: `{count, number} {count, plural,
      one {sample}
      other {samples}
    } at Test Institution`},
});

const propTypes = {
  materialRefName: PropTypes.string.isRequired,
};

const joinNewLine = array => array && array.join('\n');

const joinParagraph = array =>
  array && array.length > 0 && array.map((value, index) => <p key={index}>{value}</p>);

const asList = array =>
  array && array.length && (
  <ul>
    {array.map((value, index) => <li key={index}>{value}</li>)}
  </ul>
);

const renderField = (name, value, renderValue) => {
  const renderedValue = renderValue ? renderValue(value) : value;

  if (renderedValue) {
    return (
      <div>
        <dt>{name}</dt><dd>{renderedValue}</dd>
      </div>
    );
  }

  return null;
};

const renderResult = (result) => {
  const {
    'collectionspace_core:uri': uri,
    'collectionobjects_common:objectNumber': objectNumber,
    'collectionobjects_common:briefDescriptions': briefDescriptions,
    'collectionobjects_common:collection': collection,
    'collectionobjects_common:colors': colors,
    'collectionobjects_materials:materialPhysicalDescriptions': physicalDescriptions,
  } = result;

  return (
    <li key={uri}>
      <div>{objectNumber}</div>
      <dl>
        {renderField('Description', briefDescriptions, asList)}
        {renderField('Collection', collection)}
        {renderField('Color', colors, asList)}
        {renderField('Physical description', physicalDescriptions, joinParagraph)}
      </dl>
    </li>
  );
};

const handleData = (results) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className={styles.common}>
      <h3><FormattedMessage {...messages.title} values={{ count: results.length }} /></h3>

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
      loader={<div />}
      onAllData={handleData}
      onNoResults={null}
      showResultStats={false}
      size={500}
      sortBy="asc"
    />
  );
}

SampleList.propTypes = propTypes;
