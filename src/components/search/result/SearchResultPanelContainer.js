import { connect } from 'react-redux';
import SearchResultPanel from './SearchResultPanel';
import { search } from '../../../actions/searchActions';

const mapDispatchToProps = {
  search,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(SearchResultPanel);
