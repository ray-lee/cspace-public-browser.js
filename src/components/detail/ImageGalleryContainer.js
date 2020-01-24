import { connect } from 'react-redux';
import ImageGallery from './ImageGallery';
import { findMedia } from '../../actions/mediaActions';
import { getMedia } from '../../reducers';

const mapStateToProps = (state, ownProps) => ({
  media: getMedia(state, ownProps.referenceValue),
});

const mapDispatchToProps = {
  findMedia,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageGallery);
