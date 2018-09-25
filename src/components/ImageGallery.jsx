import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-image-gallery';
// import '!style-loader!css-loader!react-image-gallery/styles/css/image-gallery-no-icon.css';
import '!style-loader!css-loader!react-image-gallery/styles/css/image-gallery.css';
import config from '../config';
import { blobUrl } from '../helpers/urlHelpers';
import styles from '../../styles/cspace/ImageGallery.css';

const propTypes = {
  blobCsids: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  blobCsids: [],
};

export default function ImageGallery(props) {
  const { blobCsids } = props;

  let gallery = null;

  if (blobCsids && blobCsids.length > 0) {
    const gatewayUrl = config.get('gatewayUrl');

    const items = blobCsids.map(blobCsid => ({
      original: blobUrl(gatewayUrl, blobCsid, 'OriginalJpeg'),
      thumbnail: blobUrl(gatewayUrl, blobCsid, 'Thumbnail'),
    }));

    if (items.length > 0) {
      return (
        <div className={styles.common}>
          <Gallery
            disableArrowKeys
            items={items}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={items.length > 1}
            // useBrowserFullscreen={false}
          />
        </div>
      );
    }
  }

  return null;
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;
