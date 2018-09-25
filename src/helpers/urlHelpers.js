export const blobUrl = (gatewayUrl, blobCsid, derivative) =>
  `${gatewayUrl}/cspace-services/blobs/${blobCsid}/derivatives/${derivative}/content`;
