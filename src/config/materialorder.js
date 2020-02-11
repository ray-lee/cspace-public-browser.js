import { defineMessages } from 'react-intl';
import { getItemShortID } from 'cspace-refname';

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
  messages: {
    'rootPage.title': 'Material Order',
    'searchQueryInput.label': 'Search materials',
    'searchQueryInput.placeholder': 'Search materials',
    'searchResultStats.count': '{count, plural, one {# material} other {# materials}} found',
    'institutionIndex.label': 'Samples at {title}',
  },

  esIndexName: 'materials',
  detailPath: 'material',

  defaultQuery: {
    term: {
      'ecm:primaryType': 'Materialitem',
    },
  },

  includeFields: [
    'ecm:name',
    'ecm:primaryType',
    'collectionspace_denorm:holdingInstitutions',
    'collectionspace_denorm:mediaCsid',
    'collectionspace_denorm:title',
    'materials_common:shortIdentifier',
  ],

  storageKey: 'mo',

  detailTitle: (data) => {
    const {
      'materials_common:materialTermGroupList': materialTermGroups,
    } = data;

    if (materialTermGroups.length > 0) {
      const {
        termDisplayName,
        historicalStatus,
      } = materialTermGroups[0];

      const title = (
        termDisplayName + (historicalStatus === 'historical' ? ' (formerly known as)' : '')
      );

      return title;
    }

    return undefined;
  },

  detailSubtitle: (data) => {
    const {
      'materials_common:materialTermGroupList': materialTermGroups,
    } = data;

    if (materialTermGroups.length > 1) {
      const displayNames = materialTermGroups
        .slice(1)
        .map((termGroup) => {
          const {
            termDisplayName,
            historicalStatus,
          } = termGroup;

          return (
            termDisplayName + (historicalStatus === 'historical' ? ' (formerly known as)' : '')
          );
        });

      return renderJoined(displayNames, '\n');
    }

    return undefined;
  },

  detailDescription: (data) => {
    const {
      'materials_common:description': description,
    } = data;

    return description;
  },

  filterGroups: [
    {
      id: 'institution',
      messages: defineMessages({
        title: {
          id: 'filterGroup.institution.title',
          defaultMessage: 'Holding Institution',
        },
      }),
      filters: [
        {
          id: 'materialTermAttributionContributingOrganization',
          field: 'collectionspace_denorm:holdingInstitutions.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.materialTermAttributionContributingOrganization.label',
              defaultMessage: 'Institution',
            },
          }),
        },
      ],
    },
    {
      id: 'composition',
      // title: 'Composition',
      messages: defineMessages({
        title: {
          id: 'filterGroup.composition.title',
          defaultMessage: 'Composition',
        },
      }),
      filters: [
        {
          id: 'materialCompositionFamilyName',
          field: 'materials_common:materialCompositionGroupList.materialCompositionFamilyName.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.materialCompositionFamilyName.label',
              defaultMessage: 'Family name',
            },
            shortLabel: {
              id: 'filter.materialCompositionFamilyName.shortLabel',
              defaultMessage: 'Family',
            },
          }),
        },
        {
          id: 'materialCompositionClassName',
          field: 'materials_common:materialCompositionGroupList.materialCompositionClassName.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.materialCompositionClassName.label',
              defaultMessage: 'Class name',
            },
            shortLabel: {
              id: 'filter.materialCompositionClassName.shortLabel',
              defaultMessage: 'Class',
            },
          }),
        },
        {
          id: 'materialCompositionGenericName',
          field: 'materials_common:materialCompositionGroupList.materialCompositionGenericName.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.materialCompositionGenericName.label',
              defaultMessage: 'Generic name',
            },
            shortLabel: {
              id: 'filter.materialCompositionGenericName.shortLabel',
              defaultMessage: 'Generic',
            },
          }),
        },
      ],
    },
    {
      id: 'use',
      // title: 'Use',
      messages: defineMessages({
        title: {
          id: 'filterGroup.use.title',
          defaultMessage: 'Use',
        },
      }),
      filters: [
        {
          id: 'typicalUses',
          field: 'materials_common:typicalUses.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.typicalUses.label',
              defaultMessage: 'Typical use',
            },
          }),
        },
        // {
        //   id: 'featuredApplication',
        //   field: 'materials_common:featuredApplicationGroupList.featuredApplication.displayName',
        //   title: 'Featured application',
        // },
      ],
    },
    /* eslint-disable max-len */
    // {
    //   id: 'production',
    //   title: 'Production',
    //   filters: [
    //     {
    //       id: 'materialProductionOrganization',
    //       field: 'materials_common:materialProductionOrganizationGroupList.materialProductionOrganization.displayName',
    //       title: 'Production organization',
    //     },
    //     {
    //       id: 'materialProductionPerson',
    //       field: 'materials_common:materialProductionPersonGroupList.materialProductionPerson.displayName',
    //       title: 'Production person',
    //     },
    //     {
    //       id: 'materialProductionPlace',
    //       field: 'materials_common:materialProductionPlaceGroupList.materialProductionPlace.displayName',
    //       title: 'Production place',
    //     }
    //   ],
    // },
    /* eslint-enable max-len */
    {
      id: 'form',
      messages: defineMessages({
        title: {
          id: 'filterGroup.form.title',
          defaultMessage: 'Form',
        },
      }),
      filters: [
        {
          id: 'commonForm',
          field: 'materials_common:commonForm.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.commonForm.label',
              defaultMessage: 'Common form',
            },
          }),
        },
        {
          id: 'formType',
          field: 'materials_common:formTypeGroupList.formType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.formType.label',
              defaultMessage: 'Form type',
            },
          }),
        },
      ],
    },
    {
      id: 'properties',
      // title: 'Properties',
      messages: defineMessages({
        title: {
          id: 'filterGroup.properties.title',
          defaultMessage: 'Properties',
        },
      }),
      filters: [
        {
          id: 'acousticalPropertyType',
          field: 'materials_common:acousticalPropertyGroupList.acousticalPropertyType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.acousticalPropertyType.label',
              defaultMessage: 'Acoustical property',
            },
            shortLabel: {
              id: 'filter.acousticalPropertyType.shortLabel',
              defaultMessage: 'Acoustical',
            },
          }),
        },
        {
          id: 'durabilityPropertyType',
          field: 'materials_common:durabilityPropertyGroupList.durabilityPropertyType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.durabilityPropertyType.label',
              defaultMessage: 'Durability property',
            },
            shortLabel: {
              id: 'filter.durabilityPropertyType.shortLabel',
              defaultMessage: 'Durability',
            },
          }),
        },
        {
          id: 'electricalPropertyType',
          field: 'materials_common:electricalPropertyGroupList.electricalPropertyType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.electricalPropertyType.label',
              defaultMessage: 'Electrical property',
            },
            shortLabel: {
              id: 'filter.electricalPropertyType.shortLabel',
              defaultMessage: 'Electrical',
            },
          }),
        },
        {
          id: 'hygrothermalPropertyType',
          field: 'materials_common:hygrothermalPropertyGroupList.hygrothermalPropertyType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.hygrothermalPropertyType.label',
              defaultMessage: 'Hygrothermal property',
            },
            shortLabel: {
              id: 'filter.hygrothermalPropertyType.shortLabel',
              defaultMessage: 'Hygrothermal',
            },
          }),
        },
        {
          id: 'mechanicalPropertyType',
          field: 'materials_common:mechanicalPropertyGroupList.mechanicalPropertyType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.mechanicalPropertyType.label',
              defaultMessage: 'Mechanical property',
            },
            shortLabel: {
              id: 'filter.mechanicalPropertyType.shortLabel',
              defaultMessage: 'Mechanical',
            },
          }),
        },
        {
          id: 'opticalPropertyType',
          field: 'materials_common:opticalPropertyGroupList.opticalPropertyType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.opticalPropertyType.label',
              defaultMessage: 'Optical property',
            },
            shortLabel: {
              id: 'filter.opticalPropertyType.shortLabel',
              defaultMessage: 'Optical',
            },
          }),
        },
        {
          id: 'sensorialPropertyType',
          field: 'materials_common:sensorialPropertyGroupList.sensorialPropertyType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.sensorialPropertyType.label',
              defaultMessage: 'Sensorial property',
            },
            shortLabel: {
              id: 'filter.sensorialPropertyType.shortLabel',
              defaultMessage: 'Sensorial',
            },
          }),
        },
        {
          id: 'smartMaterialPropertyType',
          field: 'materials_common:smartMaterialPropertyGroupList.smartMaterialPropertyType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.smartMaterialPropertyType.label',
              defaultMessage: 'Smart material property',
            },
            shortLabel: {
              id: 'filter.smartMaterialPropertyType.shortLabel',
              defaultMessage: 'Smart material',
            },
          }),
        },
        {
          id: 'additionalPropertyType',
          field: 'materials_common:additionalPropertyGroupList.additionalPropertyType.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.additionalPropertyType.label',
              defaultMessage: 'Additional property',
            },
          }),
        },
      ],
    },
    {
      id: 'ecology',
      // title: 'Material Ecology',
      messages: defineMessages({
        title: {
          id: 'filterGroup.ecology.title',
          defaultMessage: 'Material Ecology',
        },
      }),
      filters: [
        {
          id: 'recycledContentQualifier',
          field: 'materials_common:recycledContentGroupList.recycledContentQualifier.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.recycledContentQualifier.label',
              defaultMessage: 'Recycled content',
            },
            shortLabel: {
              id: 'filter.recycledContentQualifier.shortLabel',
              defaultMessage: 'Recycled',
            },
          }),
        },
        {
          id: 'lifecycleComponent',
          field: 'materials_common:lifecycleComponentGroupList.lifecycleComponent.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.lifecycleComponent.label',
              defaultMessage: 'Lifecycle component',
            },
            shortLabel: {
              id: 'filter.lifecycleComponent.shortLabel',
              defaultMessage: 'Lifecycle',
            },
          }),
        },
        {
          id: 'certificationProgram',
          field: 'materials_common:certificationCreditGroupList.certificationProgram.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.certificationProgram.label',
              defaultMessage: 'Certification program',
            },
            shortLabel: {
              id: 'filter.certificationProgram.shortLabel',
              defaultMessage: 'Certification',
            },
          }),
        },
      ],
    },
    {
      id: 'processing',
      // title: 'Processing',
      messages: defineMessages({
        title: {
          id: 'filterGroup.processing.title',
          defaultMessage: 'Processing',
        },
      }),
      filters: [
        {
          id: 'castingProcesses',
          field: 'materials_common:castingProcesses.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.castingProcesses.label',
              defaultMessage: 'Casting process',
            },
            shortLabel: {
              id: 'filter.castingProcesses.shortLabel',
              defaultMessage: 'Casting',
            },
          }),
        },
        {
          id: 'deformingProcesses',
          field: 'materials_common:deformingProcesses.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.deformingProcesses.label',
              defaultMessage: 'Deforming process',
            },
            shortLabel: {
              id: 'filter.deformingProcesses.shortLabel',
              defaultMessage: 'Deforming',
            },
          }),
        },
        {
          id: 'joiningProcesses',
          field: 'materials_common:joiningProcesses.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.joiningProcesses.label',
              defaultMessage: 'Joining process',
            },
            shortLabel: {
              id: 'filter.joiningProcesses.shortLabel',
              defaultMessage: 'Joining',
            },
          }),
        },
        {
          id: 'machiningProcesses',
          field: 'materials_common:machiningProcesses.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.machiningProcesses.label',
              defaultMessage: 'Machining process',
            },
            shortLabel: {
              id: 'filter.machiningProcesses.shortLabel',
              defaultMessage: 'Machining',
            },
          }),
        },
        {
          id: 'moldingProcesses',
          field: 'materials_common:moldingProcesses.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.moldingProcesses.label',
              defaultMessage: 'Molding process',
            },
            shortLabel: {
              id: 'filter.moldingProcesses.shortLabel',
              defaultMessage: 'Molding',
            },
          }),
        },
        {
          id: 'rapidPrototypingProcesses',
          field: 'materials_common:rapidPrototypingProcesses.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.rapidPrototypingProcesses.label',
              defaultMessage: 'Rapid prototyping process',
            },
            shortLabel: {
              id: 'filter.rapidPrototypingProcesses.shortLabel',
              defaultMessage: 'Rapid prototyping',
            },
          }),
        },
        {
          id: 'surfacingProcesses',
          field: 'materials_common:surfacingProcesses.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.surfacingProcesses.label',
              defaultMessage: 'Surfacing process',
            },
            shortLabel: {
              id: 'filter.surfacingProcesses.shortLabel',
              defaultMessage: 'Surfacing',
            },
          }),
        },
        {
          id: 'additionalProcess',
          field: 'materials_common:additionalProcessGroupList.additionalProcess.displayName',
          messages: defineMessages({
            label: {
              id: 'filter.additionalProcess.label',
              defaultMessage: 'Additional process',
            },
          }),
        },
      ],
    },
  ],

  detailFieldList: {
    fields: {
      materialCompositionGroupList: {
        field: 'materials_common:materialCompositionGroupList',
        format: listOf(composition),
      },
      typicalUses: {
        field: 'materials_common:typicalUses',
        format: inlineListOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      featuredApplicationGroupList: {
        field: 'materials_common:featuredApplicationGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'featuredApplication',
          noteFieldName: 'featuredApplicationNote',
        })),
      },
      materialProductionOrganizationGroupList: {
        label: 'Company',
        field: 'materials_common:materialProductionOrganizationGroupList',
        format: listOf(nameRole({
          nameFieldName: 'materialProductionOrganization',
          roleFieldName: 'materialProductionOrganizationRole',
          linkName: false,
        })),
      },
      materialProductionPersonGroupList: {
        label: 'Person',
        field: 'materials_common:materialProductionPersonGroupList',
        format: listOf(nameRole({
          nameFieldName: 'materialProductionPerson',
          roleFieldName: 'materialProductionPersonRole',
          linkName: false,
        })),
      },
      materialProductionPlaceGroupList: {
        label: 'Place',
        field: 'materials_common:materialProductionPlaceGroupList',
        format: listOf(nameRole({
          nameFieldName: 'materialProductionPlace',
          roleFieldName: 'materialProductionPlaceRole',
          linkName: false,
        })),
      },
      productionDate: {
        label: 'Date',
        field: 'materials_common:productionDate',
        format: valueAt({ path: 'dateDisplayDate' }),
      },
      discontinued: {
        label: 'Discontinued',
        field: 'materials_common:discontinued',
      },
      productionNote: {
        label: 'Production Note',
        field: 'materials_common:productionNote',
      },
      externalUrlGroupList: {
        field: 'materials_common:externalUrlGroupList',
        format: listOf(linkText({
          urlFieldName: 'externalUrl',
          textFieldName: 'externalUrlNote',
          type: 'external',
        })),
      },
      additionalResourceGroupList: {
        field: 'materials_common:additionalResourceGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'additionalResource',
          noteFieldName: 'additionalResourceNote',
        })),
      },
      commonForm: {
        label: 'Common form',
        field: 'materials_common:commonForm',
        format: filterLink({
          filterValueFormat: displayName,
        }),
      },
      formTypeGroupList: {
        label: 'Form type',
        field: 'materials_common:formTypeGroupList',
        format: inlineListOf(valueAt({
          path: 'formType',
          format: filterLink({
            filterValueFormat: displayName,
          }),
        })),
      },
      acousticalPropertyGroupList: {
        label: 'Acoustical',
        field: 'materials_common:acousticalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'acousticalPropertyType',
          noteFieldName: 'acousticalPropertyNote',
        })),
      },
      durabilityPropertyGroupList: {
        label: 'Durability',
        field: 'materials_common:durabilityPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'durabilityPropertyType',
          noteFieldName: 'durabilityPropertyNote',
        })),
      },
      electricalPropertyGroupList: {
        label: 'Electrical',
        field: 'materials_common:electricalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'electricalPropertyType',
          noteFieldName: 'electricalPropertyNote',
        })),
      },
      hygrothermalPropertyGroupList: {
        label: 'Hygro-thermal',
        field: 'materials_common:hygrothermalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'hygrothermalPropertyType',
          noteFieldName: 'hygrothermalPropertyNote',
        })),
      },
      mechanicalPropertyGroupList: {
        label: 'Mechanical',
        field: 'materials_common:mechanicalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'mechanicalPropertyType',
          noteFieldName: 'mechanicalPropertyNote',
        })),
      },
      opticalPropertyGroupList: {
        label: 'Optical',
        field: 'materials_common:opticalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'opticalPropertyType',
          noteFieldName: 'opticalPropertyNote',
        })),
      },
      sensorialPropertyGroupList: {
        label: 'Sensorial',
        field: 'materials_common:sensorialPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'sensorialPropertyType',
          noteFieldName: 'sensorialPropertyNote',
        })),
      },
      smartMaterialPropertyGroupList: {
        label: 'Smart material',
        field: 'materials_common:smartMaterialPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'smartMaterialPropertyType',
          noteFieldName: 'smartMaterialPropertyNote',
        })),
      },
      additionalPropertyGroupList: {
        label: 'Additional',
        field: 'materials_common:additionalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'additionalPropertyType',
          noteFieldName: 'additionalPropertyNote',
        })),
      },
      propertyNote: {
        label: 'Property note',
        field: 'materials_common:propertyNote',
      },
      recycledContentGroupList: {
        label: 'Recycled content',
        field: 'materials_common:recycledContentGroupList',
        format: listOf(numericRange({
          lowFieldName: 'recycledContent',
          highFieldName: 'recycledContentHigh',
          unit: '%',
          qualifierFieldName: 'recycledContentQualifier',
          linkQualifier: true,
        })),
      },
      lifecycleComponentGroupList: {
        label: 'Lifecycle component',
        field: 'materials_common:lifecycleComponentGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'lifecycleComponent',
          noteFieldName: 'lifecycleComponentNote',
          noteLabel: '',
          separator: ' - ',
        })),
      },
      embodiedEnergyGroupList: {
        label: 'Embodied energy',
        field: 'materials_common:embodiedEnergyGroupList',
        format: listOf(numericRange({
          lowFieldName: 'embodiedEnergyValue',
          highFieldName: 'embodiedEnergyValueHigh',
          unitFieldName: 'embodiedEnergyUnit',
          qualifierFieldName: 'embodiedEnergyNote',
          qualifierSeparator: ' - ',
        })),
      },
      certificationCreditGroupList: {
        label: 'Certification credit',
        field: 'materials_common:certificationCreditGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'certificationProgram',
          noteFieldName: 'certificationCreditNote',
          noteLabel: '',
          separator: ' - ',
        })),
      },
      ecologyNote: {
        label: 'Material ecology note',
        field: 'materials_common:ecologyNote',
      },
      castingProcesses: {
        label: 'Casting',
        field: 'materials_common:castingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      joiningProcesses: {
        label: 'Joining',
        field: 'materials_common:joiningProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      moldingProcesses: {
        label: 'Molding',
        field: 'materials_common:moldingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      surfacingProcesses: {
        label: 'Surfacing',
        field: 'materials_common:surfacingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      deformingProcesses: {
        label: 'Deforming',
        field: 'materials_common:deformingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      machiningProcesses: {
        label: 'Machining',
        field: 'materials_common:machiningProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      rapidPrototypingProcesses: {
        label: 'Rapid prototyping',
        field: 'materials_common:rapidPrototypingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      additionalProcessGroupList: {
        label: 'Additional process',
        field: 'materials_common:additionalProcessGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'additionalProcess',
          noteFieldName: 'additionalProcessNote',
        })),
      },
      processNote: {
        label: 'Process note',
        field: 'materials_common:processNote',
      },
    },
    categories: {
      cat_composition: {
        label: 'Composition',
        fields: [
          'materialCompositionGroupList',
        ],
      },
      cat_use: {
        label: 'Typical use',
        fields: [
          'typicalUses',
        ],
      },
      cat_application: {
        label: 'Featured application',
        fields: [
          'featuredApplicationGroupList',
        ],
      },
      cat_production: {
        label: 'Production',
        fields: [
          'materialProductionOrganizationGroupList',
          'materialProductionPersonGroupList',
          'materialProductionPlaceGroupList',
          'productionDate',
          'discontinued',
          'productionNote',
        ],
      },
      cat_link: {
        label: 'External links',
        fields: [
          'externalUrlGroupList',
        ],
      },
      cat_standard: {
        label: 'External standard',
        fields: [
          'additionalResourceGroupList',
        ],
      },
      cat_form: {
        label: 'Form',
        name: 'cat_form',
        fields: [
          'commonForm',
          'formTypeGroupList',
        ],
      },
      cat_property: {
        label: 'Properties',
        fields: [
          'acousticalPropertyGroupList',
          'durabilityPropertyGroupList',
          'electricalPropertyGroupList',
          'hygrothermalPropertyGroupList',
          'mechanicalPropertyGroupList',
          'opticalPropertyGroupList',
          'sensorialPropertyGroupList',
          'smartMaterialPropertyGroupList',
          'additionalPropertyGroupList',
          'propertyNote',
        ],
      },
      cat_ecology: {
        label: 'Material ecology',
        fields: [
          'recycledContentGroupList',
          'lifecycleComponentGroupList',
          'embodiedEnergyGroupList',
          'certificationCreditGroupList',
          'ecologyNote',
        ],
      },
      cat_process: {
        label: 'Processes',
        fields: [
          'castingProcesses',
          'joiningProcesses',
          'moldingProcesses',
          'surfacingProcesses',
          'deformingProcesses',
          'machiningProcesses',
          'rapidPrototypingProcesses',
          'additionalProcessGroupList',
          'processNote',
        ],
      },
    },
    layout: {
      fields1: [
        'cat_composition',
        'cat_use',
        'cat_application',
        'cat_production',
        'cat_link',
        'cat_standard',
        'cat_form',
        'cat_property',
      ],
      fields2: [
        'cat_ecology',
        'cat_process',
      ],
    },
  },

  institutionHoldings: {
    query: (data) => {
      const {
        'collectionspace_core:refName': refName,
      } = data;

      const shortId = getItemShortID(refName);

      return {
        term: {
          'collectionobjects_common:materialGroupList.material.shortid': shortId,
        }
      }
    },
    sortField: 'collectionobjects_common:objectNumber',
    title: {
      name: 'collectionobjects_common:otherNumberList',
      format: pickFromList({
        condition: {
          path: 'numberType',
          value: 'callnumber',
        },
        format: valueAt({ path: 'numberValue' }),
      }),
    },
    fieldList: {
      fields: {
        otherNumberList: {
          label: 'Call number',
          field: 'collectionobjects_common:otherNumberList',
          format: pickAllFromList({
            condition: {
              path: 'numberType',
              value: 'callnumber',
            },
            format: valueAt({ path: 'numberValue' }),
          }),
          className: 'title',
        },
        collection: {
          label: 'Collection',
          field: 'collectionobjects_common:collection',
          format: displayName,
        },
        computedCurrentLocation: {
          label: 'Current location',
          field: 'collectionobjects_common:computedCurrentLocation',
          format: displayName,
        },
        materialPhysicalDescriptions: {
          label: 'Physical description',
          field: 'collectionobjects_materials:materialPhysicalDescriptions',
          format: paragraphs,
        },
        materialContainerGroupList: {
          label: 'Container',
          field: 'collectionobjects_materials:materialContainerGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'container',
            noteFieldName: 'containerNote',
            linkValue: false,
          })),
        },
        materialConditionGroupList: {
          label: 'Condition',
          field: 'collectionobjects_materials:materialConditionGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'condition',
            noteFieldName: 'conditionNote',
            linkValue: false,
          })),
        },
        materialHandlingGroupList: {
          label: 'Handling',
          field: 'collectionobjects_materials:materialHandlingGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'handling',
            noteFieldName: 'handlingNote',
            linkValue: false,
          })),
        },
        colors: {
          label: 'Color',
          field: 'collectionobjects_common:colors',
          format: inlineList,
        },
        materialGenericColors: {
          label: 'Generic color',
          field: 'collectionobjects_materials:materialGenericColors',
          format: inlineListOf(displayName),
        },
        materialFinishGroupList: {
          label: 'Finish',
          field: 'collectionobjects_materials:materialFinishGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'finish',
            noteFieldName: 'finishNote',
            linkValue: false,
          })),
        },
        numberOfObjects: {
          label: 'Holdings',
          field: 'collectionobjects_common:numberOfObjects',
        },
        objectStatusList: {
          label: 'Type',
          field: 'collectionobjects_common:objectStatusList',
          format: inlineListOf(objectTypeValue),
        },
        briefDescriptions: {
          label: 'Production description',
          field: 'collectionobjects_common:briefDescriptions',
          format: paragraphs,
        },
        measuredPartGroupList: {
          label: 'Size',
          field: 'collectionobjects_common:measuredPartGroupList',
          format: listOf(
            valueAt({ path: 'dimensionSummary' }),
          ),
        },
        objectNumber: {
          label: 'System number',
          field: 'collectionobjects_common:objectNumber',
        },
      },
      categories: {
        cat_sample_otherNumberList: {
          fields: [
            'otherNumberList',
          ],
        },
        cat_sample_collection: {
          fields: [
            'collection',
          ],
        },
        cat_sample_computedCurrentLocation: {
          fields: [
            'computedCurrentLocation',
          ],
        },
        cat_sample_materialPhysicalDescriptions: {
          fields: [
            'materialPhysicalDescriptions',
          ],
        },
        cat_sample_condition: {
          fields: [
            'materialContainerGroupList',
            'materialConditionGroupList',
            'materialHandlingGroupList',
          ],
        },
        cat_sample_description: {
          fields: [
            'colors',
            'materialGenericColors',
            'materialFinishGroupList',
          ],
        },
        cat_sample_holdings: {
          fields: [
            'numberOfObjects',
            'objectStatusList',
          ],
          className: 'inline',
        },
        cat_sample_briefDescriptions: {
          fields: [
            'briefDescriptions',
          ],
        },
        cat_sample_measuredPartGroupList: {
          fields: [
            'measuredPartGroupList',
          ],
        },
        cat_sample_system: {
          fields: [
            'objectNumber',
          ],
        },
      },
      layout: {
        fields1: [
          'cat_sample_otherNumberList',
          'cat_sample_collection',
          'cat_sample_computedCurrentLocation',
          'cat_sample_materialPhysicalDescriptions',
          'cat_sample_condition',
          'cat_sample_description',
          'cat_sample_holdings',
          'cat_sample_briefDescriptions',
          'cat_sample_measuredPartGroupList',
          'cat_sample_system',
        ],
      },
    },
  },
};
