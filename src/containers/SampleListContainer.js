import { connect } from 'react-redux';
import SampleList from '../components/SampleList';
import { expandPanel, togglePanel } from '../actions/prefsActions';
import { isPanelExpanded } from '../reducers';

const panelId = (institutionId) => `SampleList-${institutionId}`;

const mapStateToProps = (state, ownProps) => ({
  isExpanded: isPanelExpanded(state, panelId(ownProps.institutionId)),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  expandPanel: () => dispatch(expandPanel(panelId(ownProps.institutionId))),
  togglePanel: () => dispatch(togglePanel(panelId(ownProps.institutionId))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SampleList);
