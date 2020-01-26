import config from '../config';

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
          }
        },
        {
          multi_match: {
            query: value,
            fields: [
              'all_field',
            ],
            type: 'phrase_prefix',
            operator: 'and',
          }
        },
      ],
    },
  };
}

export const filterParamToQuery = (id, value) => {

}

export const getQuery = (params) => {
  const clauses = [
    config.get('defaultQuery'),
    fulltextParamToQuery(params.get('search')),
  ]
    .filter(clause => !!clause);

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

export const getSort = (params) => {
  const sortOrder = params.get('sort') || config.get('defaultSortOrder');

  const effectiveSortOrder = (sortOrder === 'bestmatch' && params.delete('sort').isEmpty())
    ? 'newest'
    : sortOrder;

  switch(effectiveSortOrder) {
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
