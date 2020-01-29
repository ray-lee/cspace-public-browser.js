import { connect } from 'react-redux';
import Filter from './Filter';
import { setFilterSearchValue } from '../../../actions/filterActions';
import { getFilterSearchValue, getSearchParams } from '../../../reducers';

const mapStateToProps = (state, ownProps) => ({
  searchValue: getFilterSearchValue(state, ownProps.id),
  params: getSearchParams(state),
});

const mapDispatchToProps = ({
  onSearchValueCommit: setFilterSearchValue,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
