import qs from 'qs';
import Immutable from 'immutable';

export const blobUrl = (gatewayUrl, mediaCsid, derivative) => (
  `${gatewayUrl}/cspace-services/media/${mediaCsid}/blob/derivatives/${derivative}/content`
);

export const paramsToQueryString = (params) => qs.stringify(
  params.map((value) => (value && JSON.stringify(value)))
    .filter((value) => !!value)
    .toJS(),
  { format: 'RFC1738' },
);

export const queryStringToParams = (queryString) => (
  Immutable.Map(qs.parse(queryString, { ignoreQueryPrefix: true }))
    .filter((value) => !!value)
    .map((value) => JSON.parse(value))
);
