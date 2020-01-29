import { connect } from 'react-redux';
import Filter from '../components/Filter';
import { togglePanel } from '../actions/prefsActions';
import { isPanelExpanded } from '../reducers';

const panelId = (filterId) => `Filter-${filterId}`;

const mapStateToProps = (state, ownProps) => ({
  isExpanded: isPanelExpanded(state, panelId(ownProps.id)),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  togglePanel: () => dispatch(togglePanel(panelId(ownProps.id))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
