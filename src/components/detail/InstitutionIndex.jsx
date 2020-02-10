import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import config from '../../config';
import linkStyles from '../../../styles/cspace/Link.css';
import styles from '../../../styles/cspace/InstitutionIndex.css';

const messages = defineMessages({
  label: {
    id: 'institutionIndex.label',
    defaultMessage: 'Holdings at {title}',
  },
});

const propTypes = {
  holdingInstitutions: PropTypes.instanceOf(Immutable.Set).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.object,
    search: PropTypes.string,
  }).isRequired,
};

function InstitutionIndex(props) {
  const {
    holdingInstitutions,
    location,
  } = props;

  const institutions = config.get('institutions');

  const links = holdingInstitutions.map((institutionId) => {
    const title = get(institutions, [institutionId, 'title']);

    return (
      <li key={institutionId}>
        <a className={linkStyles.hash} href={`#${institutionId}`}>
          <FormattedMessage
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...messages.label}
            values={{ title }}
          />
        </a>
      </li>
    );
  });

  if (links.size === 0) {
    return null;
  }

  return (
    <nav className={styles.common}>
      <ul>
        {links}
      </ul>
    </nav>
  );
}

InstitutionIndex.propTypes = propTypes;

export default withRouter(InstitutionIndex);
