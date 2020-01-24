import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import SearchResultImage from './SearchResultImage';
import config from '../../../config';
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

  const detailPath = config.get('detailPath');
  const referenceField = config.get('referenceField');

  const doc = result.get('_source');
  const csid = doc.get('ecm:name');
  const url = csid && `/${detailPath}/${csid}`;
  const holdingInstitutions = doc.get('collectionspace_denorm:holdingInstitutions');
  const mediaCsid = doc.getIn(['collectionspace_denorm:mediaCsid', 0]);
  const referenceValue = doc.get(referenceField);
  const title = doc.get('collectionspace_denorm:title');

  return (
    <Link
      className={styles.common}
      to={{
        pathname: url,
        state: {
          index,
          searchParams: params.toJS(),
        },
      }}
    >
      <SearchResultImage
        gatewayUrl={gatewayUrl}
        holdingInstitutions={holdingInstitutions}
        mediaCsid={mediaCsid}
        referenceValue={referenceValue}
      />

      <article>
        <h2>{title}</h2>
      </article>
    </Link>
  );
}

SearchResultTile.propTypes = propTypes;
