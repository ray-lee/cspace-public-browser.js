import { connect } from 'react-redux';
import SearchResultPanel from './SearchResultPanel';

import {
  search,
  setSearchPageSize,
} from '../../../actions/searchActions';

import {
  getSearchError,
  getSearchOffset,
  getSearchResult,
  isSearchPending,
} from '../../../reducers';

const mapStateToProps = (state) => ({
  error: getSearchError(state),
  isPending: isSearchPending(state),
  offset: getSearchOffset(state),
  result: getSearchResult(state),
});

const mapDispatchToProps = {
  search,
  setSearchPageSize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPanel);
