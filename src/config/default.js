import { defineMessages } from 'react-intl';

import {
  composition,
  displayName,
  filterLink,
  linkText,
  inlineList,
  listOf,
  inlineListOf,
  nameRole,
  numericRange,
  objectTypeValue,
  paragraphs,
  pickAllFromList,
  pickFromList,
  renderJoined,
  valueAt,
  valueWithNote,
} from '../helpers/formatHelpers';

export default {
  basename: '',
  container: '#cspace-browser',
  esIndexName: 'core',
  gatewayUrl: 'http://localhost:8181',
  locale: 'en-US',
  detailPath: 'detail',

  institutions: {},

  defaultQuery: {
    term: {
      'ecm:primaryType': 'CollectionObject',
    },
  },

  fulltextSearchFields: ['all_field'],

  includeFields: [
    'ecm:name',
    'ecm:primaryType',
    'collectionspace_denorm:holdingInstitutions',
    'collectionspace_denorm:mediaCsid',
    'collectionspace_denorm:title',
  ],

  defaultSortOrder: 'bestmatch',
  sortField: 'collectionspace_denorm:title',
  storageKey: 'cspace-browser',

  detailTitle: () => undefined,
  detailSubtitle: () => undefined,
  detailDescription: () => undefined,

  detailFields: {},
  detailCategories: {},
  detailLayout: {},

  filterGroups: [],
};
