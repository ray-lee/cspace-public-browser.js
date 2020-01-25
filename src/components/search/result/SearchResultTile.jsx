import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import SearchResultImage from './SearchResultImage';
import styles from '../../../../styles/cspace/SearchResultTile.css';

const propTypes = {
  gatewayUrl: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  result: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default function SearchResultTile(props) {
  const {
    gatewayUrl,
    index,
    params,
    result,
  } = props;

  const doc = result.get('_source');
  const csid = doc.get('ecm:name');
  const url = csid && `/material/${csid}`;
  const holdingInstitutions = doc.get('collectionspace_denorm:holdingInstitutions');
  const mediaCsid = doc.getIn(['collectionspace_denorm:mediaCsid', 0]);
  const shortId = doc.get('materials_common:shortIdentifier');
  const title = doc.get('collectionspace_denorm:title')

  return (
    <Link
      className={styles.common}
      to={{
        pathname: url,
        state: {
          search: {
            index,
            params,
          },
        },
      }}
    >
      <SearchResultImage
        gatewayUrl={gatewayUrl}
        holdingInstitutions={holdingInstitutions}
        mediaCsid={mediaCsid}
        shortId={shortId}
      />

      <article>
        <h2>{title}</h2>
      </article>
    </Link>
  );
}

SearchResultTile.propTypes = propTypes;
