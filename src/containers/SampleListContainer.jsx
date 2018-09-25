import { connect } from 'react-redux';
import SampleList from '../components/SampleList';
import { togglePanel } from '../actions/prefs';
import { isPanelExpanded } from '../reducers';

const panelId = institutionId => `SampleList-${institutionId}`;

const mapStateToProps = (state, ownProps) => ({
  isExpanded: isPanelExpanded(state, panelId(ownProps.institutionId)),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  togglePanel: () => dispatch(togglePanel(panelId(ownProps.institutionId))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SampleList);
