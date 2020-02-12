/* global fetch, AbortController */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItemShortID } from 'cspace-refname';
import Immutable from 'immutable';
import { blobUrl } from '../../../helpers/urlHelpers';
import config from '../../../config';

const propTypes = {
  gatewayUrl: PropTypes.string.isRequired,
  holdingInstitutions: PropTypes.instanceOf(Immutable.List),
  mediaCsid: PropTypes.string,
  referenceValue: PropTypes.string.isRequired,
};

const defaultProps = {
  holdingInstitutions: [],
  mediaCsid: undefined,
};

export default class SearchResultImage extends Component {
  constructor(props) {
    super();

    this.state = {
      gatewayUrl: props.gatewayUrl,
      mediaCsid: props.mediaCsid,
    };

    if (AbortController) {
      this.abortController = new AbortController();
    }
  }

  componentDidMount() {
    const {
      holdingInstitutions,
      mediaCsid,
      referenceValue,
    } = this.props;

    this.init(referenceValue, mediaCsid, holdingInstitutions);
  }

  // FIXME
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      holdingInstitutions: nextHoldingInstitutions,
      gatewayUrl: nextGatewayUrl,
      mediaCsid: nextMediaCsid,
      referenceValue: nextReferenceValue,
    } = nextProps;

    const {
      gatewayUrl,
      mediaCsid,
      referenceValue,
    } = this.props;

    if (
      mediaCsid !== nextMediaCsid
      || gatewayUrl !== nextGatewayUrl
      || referenceValue !== nextReferenceValue
    ) {
      this.setState({
        gatewayUrl: nextGatewayUrl,
        mediaCsid: nextMediaCsid,
      });

      this.init(nextReferenceValue, nextMediaCsid, nextHoldingInstitutions);
    }
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  getMediaCsid(gatewayUrl, indexName, referenceValue) {
    const url = `${gatewayUrl}/es/${indexName}/doc/_search`;
    const referenceField = config.get('referenceField');

    const query = {
      _source: 'collectionspace_denorm:mediaCsid',
      query: {
        term: {
          [referenceField]: referenceValue,
        },
      },
      size: 1,
      terminate_after: 1,
    };

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
      signal: this.abortController ? this.abortController.signal : undefined,
    })
      .then((response) => response.json())
      // eslint-disable-next-line no-underscore-dangle
      .then((data) => data.hits.hits[0]._source['collectionspace_denorm:mediaCsid'][0])
      .catch(() => undefined);
  }

  init(referenceValue, mediaCsid, holdingInstitutions) {
    if (!mediaCsid) {
      const institutions = holdingInstitutions.filter((value) => !!value);

      if (institutions.size > 0) {
        const findImage = institutions.reduce((promise, institution) => promise.catch(() => {
          const instShortId = getItemShortID(institution);
          const instGatewayUrl = config.get(['institutions', instShortId, 'gatewayUrl']);
          const instIndexName = config.get(['institutions', instShortId, 'esIndexName']);

          if (!instGatewayUrl) {
            return Promise.reject();
          }

          return (
            this.getMediaCsid(instGatewayUrl, instIndexName, referenceValue)
              .then((instMediaCsid) => {
                if (!instMediaCsid) {
                  return Promise.reject();
                }

                return Promise.resolve({ instGatewayUrl, instMediaCsid });
              })
          );
        }), Promise.reject());

        findImage
          .then(({ instGatewayUrl, instMediaCsid }) => {
            this.setState({
              gatewayUrl: instGatewayUrl,
              mediaCsid: instMediaCsid,
            });
          })
          .catch(() => {});
      }
    }
  }

  render() {
    const {
      gatewayUrl,
      mediaCsid,
    } = this.state;

    const imageUrl = mediaCsid && blobUrl(gatewayUrl, mediaCsid, 'OriginalJpeg');

    let style;

    if (imageUrl) {
      style = {
        backgroundImage: `url(${imageUrl})`,
      };
    }

    return (
      <div style={style} />
    );
  }
}

SearchResultImage.propTypes = propTypes;
SearchResultImage.defaultProps = defaultProps;
