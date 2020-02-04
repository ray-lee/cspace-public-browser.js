import { connect } from 'react-redux';
import DetailPanel from './DetailPanel';

import {
  readDetail,
} from '../../actions/detailActions';

import {
  getDetailData,
  getDetailError,
  isDetailPending,
} from '../../reducers';

const mapStateToProps = (state) => ({
  data: getDetailData(state),
  error: getDetailError(state),
  isPending: isDetailPending(state),
});

const mapDispatchToProps = {
  readDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailPanel);
