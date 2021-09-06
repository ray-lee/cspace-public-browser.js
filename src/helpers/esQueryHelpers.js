import config from '../config';
import { SEARCH_QUERY_ID, SORT_ID } from '../constants/ids';

export const fulltextParamToQuery = (value) => {
  if (!value) {
    return undefined;
  }

  const fulltextSearchFields = config.get('fulltextSearchFields');

  return {
    bool: {
      should: [
        {
          multi_match: {
            query: value,
            fields: fulltextSearchFields,
            type: 'cross_fields',
            operator: 'and',
          },
        },
        {
          multi_match: {
            query: value,
            fields: fulltextSearchFields,
            type: 'phrase_prefix',
            operator: 'and',
          },
        },
      ],
      minimum_should_match: '1',
    },
  };
};

export const termFilterParamToQuery = (field, value) => ({
  terms: {
    [field]: value.toJS(),
  },
});

export const histogramFilterParamToQuery = (field, value, interval) => {
  const clauses = value.map((v) => ({
    range: {
      [field]: {
        gte: v,
        lt: v + interval,
      },
    },
  })).toJS();

  if (clauses.length === 1) {
    return clauses[0];
  }

  return {
    bool: {
      should: clauses,
    },
  };
};

export const filterParamToQuery = (id, value) => {
  const filterFieldConfig = config.getFilterFieldConfig(id);

  if (!filterFieldConfig) {
    return undefined;
  }

  const {
    field,
    type,
  } = filterFieldConfig;

  if (type === 'histogram') {
    return histogramFilterParamToQuery(field, value, filterFieldConfig.interval);
  }

  return termFilterParamToQuery(field, value);
};

export const getSearchQuery = (params) => fulltextParamToQuery(params.get(SEARCH_QUERY_ID));

export const getFilterQueries = (params) => params
  .delete(SEARCH_QUERY_ID)
  .entrySeq()
  .map(([id, value]) => filterParamToQuery(id, value))
  .toJS();

export const getQuery = (params) => {
  const clauses = [
    config.get('defaultQuery'),
    getSearchQuery(params),
    ...getFilterQueries(params),
  ]
    .filter((clause) => !!clause);

  if (clauses.length > 1) {
    return {
      bool: {
        must: clauses,
      },
    };
  }

  if (clauses.length > 0) {
    return clauses[0];
  }

  return {
    match_all: {},
  };
};

export const getHistogramAgg = (field, interval = 1) => ({
  histogram: {
    field,
    interval,
    min_doc_count: 1,
  },
});

export const getTermsAgg = (field, order = { _term: 'asc' }) => ({
  terms: {
    field,
    order,
    size: 300,
  },
});

export const getFilterAgg = (filterFieldConfig) => {
  const {
    field,
    order,
    type,
  } = filterFieldConfig;

  if (type === 'histogram') {
    return getHistogramAgg(field, filterFieldConfig.interval);
  }

  return getTermsAgg(field, order);
};

let aggs;

export const getAggs = (params) => {
  if (!aggs) {
    aggs = {};

    const filterFieldsConfig = config.get('filters').fields;

    Object.entries(filterFieldsConfig).forEach(([id, filterFieldConfig]) => {
      const param = params.get(id);
      const hasValue = param && param.size > 0;

      if (!hasValue) {
        aggs[id] = getFilterAgg(filterFieldConfig);
      }
    });
  }

  return aggs;
};

export const getSort = (params) => {
  const sortOrder = params.get(SORT_ID) || config.get('defaultSortOrder');

  const effectiveSortOrder = (sortOrder === 'bestmatch' && params.delete(SORT_ID).isEmpty())
    ? 'newest'
    : sortOrder;

  switch (effectiveSortOrder) {
    case 'bestmatch':
      return [
        {
          _score: {
            order: 'desc',
          },
        },
        {
          [config.get('sortField')]: {
            order: 'asc',
          },
        },
      ];
    case 'atoz':
      return {
        [config.get('sortField')]: {
          order: 'asc',
        },
      };
    case 'ztoa':
      return {
        [config.get('sortField')]: {
          order: 'desc',
        },
      };
    case 'newest':
      return {
        'collectionspace_core:createdAt': {
          order: 'desc',
        },
      };
    case 'oldest':
      return {
        'collectionspace_core:createdAt': {
          order: 'asc',
        },
      };
    default:
      return {};
  }
};

export const getSearchResultPayload = (params, pageSize, offset) => ({
  query: getQuery(params.delete(SORT_ID)),
  from: offset,
  size: pageSize,
  _source: {
    includes: config.get('includeFields'),
  },
  sort: getSort(params),
});
