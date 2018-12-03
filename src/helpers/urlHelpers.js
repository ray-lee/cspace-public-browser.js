export const blobUrl = (gatewayUrl, mediaCsid, derivative) =>
  `${gatewayUrl}/cspace-services/media/${mediaCsid}/blob/derivatives/${derivative}/content`;
