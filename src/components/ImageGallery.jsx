import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import config from '../config';
import { blobUrl } from '../helpers/urlHelpers';
import styles from '../../styles/cspace/ImageGallery.css';

const propTypes = {
  mediaCsids: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  mediaCsids: [],
};

export default function ImageGallery(props) {
  const { mediaCsids } = props;

  if (mediaCsids && mediaCsids.length > 0) {
    const gatewayUrl = config.get('gatewayUrl');

    const items = mediaCsids.map(mediaCsid => ({
      original: blobUrl(gatewayUrl, mediaCsid, 'OriginalJpeg'),
      thumbnail: blobUrl(gatewayUrl, mediaCsid, 'Thumbnail'),
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
