/* global document */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import config from '../config';
import linkStyles from '../../styles/cspace/Link.css';
import styles from '../../styles/cspace/SampleIndex.css';

const messages = defineMessages({
  link: {
    id: 'sampleIndex.link',
    defaultMessage: 'Samples at {title}'
  },
});

const propTypes = {
  samples: PropTypes.instanceOf(Immutable.Map),
};

export default function SampleIndex(props) {
  const { samples } = props;

  if (!samples) {
    return null;
  }

  const institutions = config.get('institutions');

  const links = samples.entrySeq().map((entry) => {
    const [institutionId, data] = entry;
    const count = data.get('count');

    if (count === 0) {
      return null;
    }

    const title = get(institutions, [institutionId, 'title']);

    return (
      <li key={institutionId}>
        <Link className={linkStyles.hash} replace to={`#${institutionId}`}>
          <FormattedMessage
            {...messages.link}
            values={{ count, title }}
          />
        </Link>
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

SampleIndex.propTypes = propTypes;
