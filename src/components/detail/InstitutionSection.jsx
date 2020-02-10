import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import InstitutionHoldingList from './InstitutionHoldingListContainer';
import styles from '../../../styles/cspace/InstitutionSection.css';

const propTypes = {
  config: PropTypes.object.isRequired,
  holdingInstitutions: PropTypes.instanceOf(Immutable.Set).isRequired,
  refName: PropTypes.string.isRequired,
  selectedInstitutionId: PropTypes.string,
};

const defaultProps = {
  selectedInstitutionId: undefined,
};

export default function InstitutionSection(props) {
  const {
    config,
    holdingInstitutions,
    refName,
    selectedInstitutionId,
  } = props;

  if (!holdingInstitutions || holdingInstitutions.size === 0) {
    return null;
  }

  const institutions = holdingInstitutions.map((institutionId) => (
    <InstitutionHoldingList
      institutionConfig={config[institutionId]}
      institutionId={institutionId}
      isSelected={institutionId === selectedInstitutionId}
      key={institutionId}
      refName={refName}
    />
  ));

  return (
    <section className={styles.common}>
      {institutions}
    </section>
  );
}

InstitutionSection.propTypes = propTypes;
InstitutionSection.defaultProps = defaultProps;
