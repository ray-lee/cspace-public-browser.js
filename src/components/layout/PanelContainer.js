import { connect } from 'react-redux';
import Panel from './Panel';
import { isPanelExpanded } from '../../reducers';

import {
  togglePanel,
} from '../../actions/prefsActions';

const mapStateToProps = (state, ownProps) => ({
  isExpanded: isPanelExpanded(state, ownProps.id),
});

const mapDispatchToProps = {
  onHeaderClick: togglePanel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panel);
