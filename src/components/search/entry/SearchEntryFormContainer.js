import { connect } from 'react-redux';
import SearchEntryForm from './SearchEntryForm';
import { getSearchEntryFormParams } from '../../../reducers';

import {
  applySearchEntryForm,
  setSearchEntryFormParam,
} from '../../../actions/searchEntryFormActions';

const mapStateToProps = (state) => ({
  params: getSearchEntryFormParams(state),
});

const mapDispatchToProps = {
  onCommit: setSearchEntryFormParam,
  onSubmit: applySearchEntryForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchEntryForm);
