import { connect } from 'react-redux';
import SampleIndex from '../components/SampleIndex';
import { getMaterialSamples } from '../reducers';

const mapStateToProps = (state, ownProps) => ({
  samples: getMaterialSamples(state, ownProps.materialRefName),
});

export default connect(
  mapStateToProps,
)(SampleIndex);
