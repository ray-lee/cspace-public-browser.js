import { connect } from 'react-redux';
import Filter from '../components/Filter';
import { toggleFilter } from '../actions/prefs';

import {
  isFilterExpanded,
} from '../reducers';

const mapStateToProps = (state, ownProps) => ({
  isExpanded: isFilterExpanded(state, ownProps.id),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleFilter: () => dispatch(toggleFilter(ownProps.id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
