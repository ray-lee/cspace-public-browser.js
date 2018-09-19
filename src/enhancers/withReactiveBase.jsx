import React from 'react';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import config from '../config';

export default function withReactiveBase(BaseComponent) {
  function WithReactiveBase(props) {
    const esIndexName = config.get('esIndexName');
    const gatewayUrl = config.get('gatewayUrl');

    return (
      <ReactiveBase
        app={esIndexName}
        type="doc"
        credentials=""
        url={`${gatewayUrl}/es`}
        theme={{
          typography: {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
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
        <BaseComponent {...props} />
      </ReactiveBase>
    );
  }

  return WithReactiveBase;
}
