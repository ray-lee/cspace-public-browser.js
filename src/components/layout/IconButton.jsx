import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace/IconButton.css';

const propTypes = {
  className: PropTypes.string,
  labelMessage: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  onClick: undefined,
};

export default function IconButton(props) {
  const {
    className,
    labelMessage,
    onClick,
  } = props;

  return (
    <button
      className={classNames(className, styles.common)}
      type="button"
      onClick={onClick}
    >
      <FormattedMessage {...labelMessage} />
    </button>
  );
}

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;
