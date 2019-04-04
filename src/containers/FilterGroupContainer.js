import { connect } from 'react-redux';
import { storeKey } from '@appbaseio/reactivecore';
import FilterGroup from '../components/FilterGroup';

const mapStateToProps = state => ({
  aggs: state.aggregations,
});

export default connect(
  mapStateToProps,
  undefined,
  undefined,
  { storeKey },
)(FilterGroup);
