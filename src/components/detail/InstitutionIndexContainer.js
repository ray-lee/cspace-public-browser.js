import { connect } from 'react-redux';
import InstitutionIndex from './InstitutionIndex';
import { getDetailHoldingInstitutions } from '../../reducers';

const mapStateToProps = (state) => ({
  holdingInstitutions: getDetailHoldingInstitutions(state),
});

export default connect(
  mapStateToProps,
)(InstitutionIndex);
