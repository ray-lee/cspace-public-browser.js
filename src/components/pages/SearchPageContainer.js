import { connect } from 'react-redux';
import SearchPage from './SearchPage';
import { togglePanel } from '../../actions/prefsActions';
import { setSearchParams } from '../../actions/searchActions';
import { FILTER_PANEL_ID } from '../../constants/ids';
import { isPanelExpanded, getSearchParams } from '../../reducers';

const mapStateToProps = (state) => ({
  isFilterPanelExpanded: isPanelExpanded(state, FILTER_PANEL_ID),
  params: getSearchParams(state),
});

const mapDispatchToProps = {
  onLocationChange: setSearchParams,
  onTogglePanelButtonClick: togglePanel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
