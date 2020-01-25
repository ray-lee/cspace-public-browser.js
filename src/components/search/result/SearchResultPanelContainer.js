import { connect } from 'react-redux';
import SearchResultPanel from './SearchResultPanel';
import { search } from '../../../actions/searchActions';

import {
  getSearchError,
  getSearchResult,
  isSearchPending,
} from '../../../reducers';

const mapStateToProps = (state) => ({
  error: getSearchError(state),
  isPending: isSearchPending(state),
  result: getSearchResult(state),
});

const mapDispatchToProps = {
  search,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPanel);
