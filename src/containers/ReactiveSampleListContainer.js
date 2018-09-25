import { connect } from 'react-redux';
import ReactiveSampleList from '../components/ReactiveSampleList';
import { setMaterialSampleCount } from '../actions/material';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSamplesLoaded: (institutionId, count) =>
    dispatch(setMaterialSampleCount(ownProps.materialRefName, institutionId, count)),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(ReactiveSampleList);
