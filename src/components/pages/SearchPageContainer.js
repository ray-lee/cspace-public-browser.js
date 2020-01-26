import { connect } from 'react-redux';
import SearchPage from './SearchPage';
import { setSearchParams } from '../../actions/searchActions';
import { getSearchParams } from '../../reducers';

const mapStateToProps = (state) => ({
  params: getSearchParams(state),
});

const mapDispatchToProps = {
  onLocationChange: setSearchParams,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
