import React from 'react';
import PropTypes from 'prop-types';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import config from '../config';

export default function withReactiveBase(BaseComponent) {
  const propTypes = {
    esIndexName: PropTypes.string,
    gatewayUrl: PropTypes.string,
  };

  const defaultProps = {
    esIndexName: config.get('esIndexName'),
    gatewayUrl: config.get('gatewayUrl'),
  };

  function WithReactiveBase(props) {
    const {
      esIndexName,
      gatewayUrl,
      ...remainingProps
    } = props;

    return (
      <ReactiveBase
        app={esIndexName}
        type="doc"
        credentials=""
        url={`${gatewayUrl}/es`}
        theme={{
          typography: {
            fontFamily: 'inherit',
            fontSize: '1rem',
          },
          colors: {
            textColor: '#424242',
            primaryTextColor: '#fff',
            primaryColor: '#424242',
            titleColor: '#424242',
            alertColor: '#d9534f',
          },
          component: {
            margin: 0,
          },
        }}
      >
        <BaseComponent {...remainingProps} />
      </ReactiveBase>
    );
  }

  WithReactiveBase.propTypes = propTypes;
  WithReactiveBase.defaultProps = defaultProps;

  return WithReactiveBase;
}
