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

export const filterParamToQuery = (id, value) => {
  return undefined;
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

let aggs;

export const getAggs = () => {
  if (!aggs) {
    aggs = {};

    config.get('filterGroups').forEach(({ filters }) => {
      filters.forEach(({ id, field }) => {
        aggs[id] = {
          terms: {
            field,
            size: 300,
            order: {
              _term: 'asc',
            },
          },
        };
      });
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
