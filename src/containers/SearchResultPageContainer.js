import { connect } from 'react-redux';
import SearchResultPage from '../components/SearchResultPage';
import { togglePanel } from '../actions/prefs';
import { setPanelRect } from '../actions/layout';
import { getLayoutPanelRect, isPanelExpanded } from '../reducers';

const searchEntryPanelId = 'searchEntry';

const mapStateToProps = state => ({
  isSearchEntryPanelExpanded: isPanelExpanded(state, searchEntryPanelId),
  searchEntryPanelRect: getLayoutPanelRect(state, searchEntryPanelId),
});

const mapDispatchToProps = dispatch => ({
  toggleSearchEntryPanel: () => dispatch(togglePanel(searchEntryPanelId)),
  setSearchEntryPanelRect: rect => dispatch(setPanelRect(searchEntryPanelId, rect)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);
