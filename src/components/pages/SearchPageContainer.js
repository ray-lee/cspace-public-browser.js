import { connect } from 'react-redux';
import SearchPage from './SearchPage';
import { setSearchPageParams } from '../../actions/searchPageActions';
import { getSearchPageParams } from '../../reducers';

const mapStateToProps = (state) => ({
  params: getSearchPageParams(state),
});

const mapDispatchToProps = {
  onLocationChange: setSearchPageParams,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
