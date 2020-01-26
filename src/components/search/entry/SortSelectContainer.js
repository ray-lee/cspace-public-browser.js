import { connect } from 'react-redux';
import SortSelect from './SortSelect';
import { applySortOrder } from '../../../actions/searchActions';

const mapDispatchToProps = {
  onCommit: applySortOrder,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(SortSelect);
