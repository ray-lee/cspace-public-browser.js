import { connect } from 'react-redux';
import InstitutionHoldingList from './InstitutionHoldingList';

import {
  expandPanel,
  togglePanel,
} from '../../actions/prefsActions';

import {
  getDetailInstitutionHits,
  isPanelExpanded,
} from '../../reducers';

const panelId = (institutionId) => `SampleList-${institutionId}`;

const mapStateToProps = (state, ownProps) => ({
  hits: getDetailInstitutionHits(state, ownProps.institutionId),
  isExpanded: isPanelExpanded(state, panelId(ownProps.institutionId)),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  expandPanel: () => dispatch(expandPanel(panelId(ownProps.institutionId))),
  togglePanel: () => dispatch(togglePanel(panelId(ownProps.institutionId))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstitutionHoldingList);
