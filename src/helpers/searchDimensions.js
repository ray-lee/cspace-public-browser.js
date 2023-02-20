/* global window */

import cssDimensions from '../../styles/dimensions.css';

const {
  searchResultTileWidth: cssTileWidth,
  searchResultTileBodyHeight: cssTileBodyHeight,
} = cssDimensions;

export const tileWidth = parseInt(cssTileWidth, 10);
export const tileBodyHeight = parseInt(cssTileBodyHeight, 10);
export const tileHeight = tileWidth + tileBodyHeight;

export function calculateSearchPageSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = window.devicePixelRatio || 1;
  const pageSize = ((width / tileWidth) * (height / tileHeight + 2)) / ratio;

  return Math.max(Math.ceil(pageSize), 12);
}
