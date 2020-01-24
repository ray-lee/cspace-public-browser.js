import { connect } from 'react-redux';
import SearchPage from './SearchPage';
import { initSearchPage } from '../../actions/searchPageActions';
import { getSearchPageParams } from '../../reducers';

const mapStateToProps = (state) => ({
  params: getSearchPageParams(state),
});

const mapDispatchToProps = {
  init: initSearchPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
