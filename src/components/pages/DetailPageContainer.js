import { connect } from 'react-redux';
import DetailPage from './DetailPage';
import { clearDetail, setDetailParams } from '../../actions/detailActions';
import { getDetailParams } from '../../reducers';

const mapStateToProps = (state) => ({
  params: getDetailParams(state),
});

const mapDispatchToProps = {
  onLeave: clearDetail,
  onLocationChange: setDetailParams,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailPage);
