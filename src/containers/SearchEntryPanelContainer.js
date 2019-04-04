import { connect } from 'react-redux';
import SearchEntryPanel from '../components/SearchEntryPanel';
import { togglePanel } from '../actions/prefs';
import { isPanelExpanded } from '../reducers';

const mapStateToProps = (state, ownProps) => ({
  isExpanded: isPanelExpanded(state, ownProps.id || 'search'),
});

const mapDispatchToProps = {
  togglePanel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchEntryPanel);
