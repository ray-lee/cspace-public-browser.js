import { connect } from 'react-redux';
import SearchResultPage from '../components/SearchResultPage';
import { togglePanel } from '../actions/prefs';
import { setPanelRect } from '../actions/layout';
import { getLayoutPanelRect, isPanelExpanded } from '../reducers';

const filterPanelId = 'filter';
const searchEntryPanelId = 'searchEntry';

const mapStateToProps = (state) => ({
  isFilterPanelExpanded: isPanelExpanded(state, filterPanelId),
  isSearchEntryPanelExpanded: isPanelExpanded(state, searchEntryPanelId),
  searchEntryPanelRect: getLayoutPanelRect(state, searchEntryPanelId),
});

const mapDispatchToProps = (dispatch) => ({
  toggleFilterPanel: () => dispatch(togglePanel(filterPanelId)),
  toggleSearchEntryPanel: () => dispatch(togglePanel(searchEntryPanelId)),
  setSearchEntryPanelRect: (rect) => dispatch(setPanelRect(searchEntryPanelId, rect)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);
