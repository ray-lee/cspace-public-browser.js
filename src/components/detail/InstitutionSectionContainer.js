import { connect } from 'react-redux';
import InstitutionSection from './InstitutionSection';
import { getDetailHoldingInstitutions } from '../../reducers';

const mapStateToProps = (state) => ({
  holdingInstitutions: getDetailHoldingInstitutions(state),
});

export default connect(
  mapStateToProps,
)(InstitutionSection);
