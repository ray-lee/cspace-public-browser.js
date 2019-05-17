import { connect } from 'react-redux';
import ImageGallery from '../components/ImageGallery';
import { findMaterialMedia } from '../actions/material';
import { getMaterialMedia } from '../reducers';

const mapStateToProps = (state, ownProps) => ({
  media: getMaterialMedia(state, ownProps.materialRefName),
});

const mapDispatchToProps = {
  findMaterialMedia,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageGallery);
