import { connect } from 'react-redux';
import DetailPanel from '../components/DetailPanel';
import { setMaterialMedia } from '../actions/material';

const mapDispatchToProps = {
  setMaterialMedia,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(DetailPanel);
