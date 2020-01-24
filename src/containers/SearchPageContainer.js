import { connect } from 'react-redux';
import SearchPage from '../components/pages/SearchPage';
import { togglePanel } from '../actions/prefs';
import { setPanelRect } from '../actions/layout';
import { initSearchPage } from '../actions/searchPageActions';
import { getLayoutPanelRect, isPanelExpanded } from '../reducers';

const filterPanelId = 'filter';
const searchEntryPanelId = 'searchEntry';

const mapStateToProps = (state) => ({
  isFilterPanelExpanded: isPanelExpanded(state, filterPanelId),
  isSearchEntryPanelExpanded: isPanelExpanded(state, searchEntryPanelId),
  searchEntryPanelRect: getLayoutPanelRect(state, searchEntryPanelId),
});

const mapDispatchToProps = (dispatch) => ({
  init: (location) => initSearchPage(location),
  toggleFilterPanel: () => dispatch(togglePanel(filterPanelId)),
  toggleSearchEntryPanel: () => dispatch(togglePanel(searchEntryPanelId)),
  setSearchEntryPanelRect: (rect) => dispatch(setPanelRect(searchEntryPanelId, rect)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
