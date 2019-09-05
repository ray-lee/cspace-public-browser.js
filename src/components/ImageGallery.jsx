import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import config from '../config';
import { blobUrl } from '../helpers/urlHelpers';
import styles from '../../styles/cspace/ImageGallery.css';

const propTypes = {
  institutionId: PropTypes.string,
  materialRefName: PropTypes.string.isRequired,
  media: PropTypes.instanceOf(Immutable.Map),
  findMaterialMedia: PropTypes.func,
};

const defaultProps = {
  institutionId: undefined,
  media: undefined,
  findMaterialMedia: undefined,
};

export default class ImageGallery extends Component {
  componentDidMount() {
    const {
      institutionId,
      materialRefName,
      media,
      findMaterialMedia,
    } = this.props;

    if (findMaterialMedia) {
      const institutionIds = (typeof institutionId === 'undefined')
        ? [null, ...Object.keys(config.get('institutions'))]
        : [institutionId];

      institutionIds.forEach((instId) => {
        if (!media || !media.get(instId)) {
          findMaterialMedia(materialRefName, instId);
        }
      });
    }
  }

  render() {
    const {
      institutionId,
      media,
    } = this.props;

    if (!media) {
      return null;
    }

    const institutionIds = (typeof institutionId === 'undefined')
      ? [null, ...Object.keys(config.get('institutions'))]
      : [institutionId];

    const items = [];

    institutionIds.forEach((instId) => {
      const mediaCsids = media.get(instId);

      if (mediaCsids && mediaCsids.size > 0) {
        const gatewayUrl = instId
          ? config.get(['institutions', instId, 'gatewayUrl'])
          : config.get('gatewayUrl');

        mediaCsids.forEach((mediaCsid) => {
          items.push({
            original: blobUrl(gatewayUrl, mediaCsid, 'OriginalJpeg'),
            thumbnail: blobUrl(gatewayUrl, mediaCsid, 'Thumbnail'),
          });
        });
      }
    });

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

    return <div />;
  }
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;
