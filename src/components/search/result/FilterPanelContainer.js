import { connect } from 'react-redux';
import FilterPanel from './FilterPanel';

import {
  getSearchResult,
  isSearchPending,
} from '../../../reducers';

const mapStateToProps = (state) => ({
  isPending: isSearchPending(state),
  result: getSearchResult(state),
});

export default connect(
  mapStateToProps,
)(FilterPanel);
