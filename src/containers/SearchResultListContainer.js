import { connect } from 'react-redux';
import get from 'lodash/get';
import { storeKey } from '@appbaseio/reactivecore';
import SearchResultList from '../components/SearchResultList';

const mapStateToProps = (state) => ({
  hits: get(state, ['hits', 'results']),
  query: get(state, ['queryLog', 'results']),
});

export default connect(
  mapStateToProps,
  undefined,
  undefined,
  { storeKey },
)(SearchResultList);
