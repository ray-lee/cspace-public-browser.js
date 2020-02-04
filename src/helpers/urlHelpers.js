import qs from 'qs';
import Immutable from 'immutable';

export const blobUrl = (gatewayUrl, mediaCsid, derivative) => (
  `${gatewayUrl}/cspace-services/media/${mediaCsid}/blob/derivatives/${derivative}/content`
);

export const searchParamsToQueryString = (params) => qs.stringify(
  params.map((value) => (value && JSON.stringify(value)))
    .filter((value) => !!value)
    .toJS(),
  { format: 'RFC1738' },
);

export const locationToSearchParams = (location) => (
  Immutable.Map(qs.parse(location.search, { ignoreQueryPrefix: true }))
    .filter((value) => !!value)
    .map((value) => Immutable.fromJS(JSON.parse(value)))
);

export const locationToDetailParams = (location, match) => {
  let params = Immutable.fromJS(match.params);

  const { hash } = location;

  if (hash) {
    params = params.set('#', hash.substring(1));
  }

  return params;
};
