import { connect } from 'react-redux';
import SearchResultPanel from './SearchResultPanel';

import {
  search,
  setSearchPageSize,
} from '../../../actions/searchActions';

import {
  getSearchError,
  getSearchNextOffset,
  getSearchResult,
  isSearchPending,
} from '../../../reducers';

const mapStateToProps = (state) => ({
  error: getSearchError(state),
  isPending: isSearchPending(state),
  offset: getSearchNextOffset(state),
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
