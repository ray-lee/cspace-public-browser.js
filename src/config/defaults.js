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
  esIndexName: 'materials',
  gatewayUrl: 'http://localhost:8181',
  locale: 'en-US',
  detailPath: 'material', // detail

  messages: {
    'rootPage.title': 'Material Order',
    'searchQueryInput.label': 'Search materials',
    'searchQueryInput.placeholder': 'Search materials',
    'searchResultStats.count': '{count, plural, =0 {No materials} one {# material} other {# materials}} found',
  },

  institutions: {
    // harvard: {
    //   title: 'Test Institution',
    //   esIndexName: 'materials',
    //   gatewayUrl: 'http://localhost:8181',
    // },
    // risd: {
    //   title: 'Test Institution',
    //   esIndexName: 'materials',
    //   gatewayUrl: 'http://localhost:8181',
    // },
    // parsons: {
    //   title: 'Test Institution',
    //   esIndexName: 'materials',
    //   gatewayUrl: 'http://localhost:8181',
    // },
  },

  defaultQuery: {
    // term: {
    //   'ecm:primaryType': 'CollectionObject',
    // }
    term: {
      'ecm:primaryType': 'Materialitem',
    },
  },

  fulltextSearchFields: [
    'all_field',
  ],

  includeFields: [
    'ecm:name',
    'ecm:primaryType',
    'collectionspace_denorm:holdingInstitutions',
    'collectionspace_denorm:mediaCsid',
    'collectionspace_denorm:title',
    'materials_common:materialTermGroupList',
    'materials_common:shortIdentifier',
  ],

  defaultSortOrder: 'bestmatch',
  sortField: 'collectionspace_denorm:title',
  storageKey: 'mo', // 'cspace-public-browser',

  types: {
    CollectionObject: {
      title: null,
      description: null,
    },
    Materialitem: {
      sort: 'collectionspace_denorm:title',
      title: (data) => data['collectionspace_denorm:title'],
      /* eslint-disable max-len */
      // title: data => {
      //   const commercialName = findFirstValue({
      //     data,
      //     inPath: ['materials_common:materialTermGroupList'],
      //     test: value => value.termFlag && value.termFlag.includes('(commercial)'),
      //     appendPath: ['termDisplayName'],
      //   });

      //   const commonName = findFirstValue({
      //     data,
      //     inPath: ['materials_common:materialTermGroupList'],
      //     test: value => value.termFlag && value.termFlag.includes('(common)'),
      //     appendPath: ['termDisplayName'],
      //   });

      //   if (commercialName && commonName) {
      //     return (
      //       <React.Fragment>
      //         {commercialName}<br />
      //         {commonName}
      //       </React.Fragment>
      //     )
      //   }

      //   return (commercialName || commonName);
      // },
      // description: data =>
      //   joinFields({
      //     data,
      //     separator: ' › ', //→›·
      //     paths: [
      //       ['materials_common:materialCompositionGroupList', 0, 'materialCompositionFamilyName'],
      //       ['materials_common:materialCompositionGroupList', 0, 'materialCompositionClassName'],
      //       ['materials_common:materialCompositionGroupList', 0, 'materialCompositionGenericName'],
      //     ],
      //     formatters: Array(3).fill(getDisplayName),
      //   }),
      // description: data => findFirstValue({
      //   data,
      //   inPath: ['materials_common:materialTermGroupList'],
      //   test: value => value.termFlag && value.termFlag.includes('(common)'),
      //   appendPath: ['termDisplayName'],
      // }),
      /* eslint-enable max-len */
      description: (data) => {
        const materialTermGroups = data['materials_common:materialTermGroupList'];

        if (materialTermGroups.length > 1) {
          const displayNames = materialTermGroups
            .slice(1)
            .map((termGroup) => {
              const {
                termDisplayName,
                // historicalStatus,
              } = termGroup;

              // return (termDisplayName + (historicalStatus ? ' (formerly known as)' : ''));
              return termDisplayName;
            });

          return renderJoined(displayNames, '\n');
          // return materialTermGroups[1].termDisplayName;
        }

        return undefined;
      },
    },
  },

  filterGroups: [
    {
      id: 'institution',
      title: 'Holding Institution',
      filters: [
        {
          id: 'materialTermAttributionContributingOrganization',
          field: 'collectionspace_denorm:holdingInstitutions.displayName',
          filterLabel: 'Institution',
          title: 'Institution',
        },
      ],
    },
    {
      id: 'composition',
      title: 'Composition',
      filters: [
        {
          id: 'materialCompositionFamilyName',
          field: 'materials_common:materialCompositionGroupList.materialCompositionFamilyName.displayName',
          title: 'Family name',
        },
        {
          id: 'materialCompositionClassName',
          field: 'materials_common:materialCompositionGroupList.materialCompositionClassName.displayName',
          filterLabel: 'Class',
          title: 'Class name',
        },
        {
          id: 'materialCompositionGenericName',
          field: 'materials_common:materialCompositionGroupList.materialCompositionGenericName.displayName',
          filterLabel: 'Generic',
          title: 'Generic name',
        },
      ],
    },
    {
      id: 'use',
      title: 'Use',
      filters: [
        {
          id: 'typicalUses',
          field: 'materials_common:typicalUses.displayName',
          title: 'Typical use',
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
      title: 'Form',
      filters: [
        {
          id: 'commonForm',
          field: 'materials_common:commonForm.displayName',
          title: 'Common form',
        },
        {
          id: 'formType',
          field: 'materials_common:formTypeGroupList.formType.displayName',
          title: 'Form type',
        },
      ],
    },
    {
      id: 'properties',
      title: 'Properties',
      filters: [
        {
          id: 'acousticalPropertyType',
          field: 'materials_common:acousticalPropertyGroupList.acousticalPropertyType.displayName',
          filterLabel: 'Acoustical',
          title: 'Acoustical property',
        },
        {
          id: 'durabilityPropertyType',
          field: 'materials_common:durabilityPropertyGroupList.durabilityPropertyType.displayName',
          filterLabel: 'Durability',
          title: 'Durability property',
        },
        {
          id: 'electricalPropertyType',
          field: 'materials_common:electricalPropertyGroupList.electricalPropertyType.displayName',
          filterLabel: 'Electrical',
          title: 'Electrical property',
        },
        {
          id: 'hygrothermalPropertyType',
          field: 'materials_common:hygrothermalPropertyGroupList.hygrothermalPropertyType.displayName',
          filterLabel: 'Hygrothermal',
          title: 'Hygrothermal property',
        },
        {
          id: 'mechanicalPropertyType',
          field: 'materials_common:mechanicalPropertyGroupList.mechanicalPropertyType.displayName',
          filterLabel: 'Mechanical',
          title: 'Mechanical property',
        },
        {
          id: 'opticalPropertyType',
          field: 'materials_common:opticalPropertyGroupList.opticalPropertyType.displayName',
          filterLabel: 'Optical',
          title: 'Optical property',
        },
        {
          id: 'sensorialPropertyType',
          field: 'materials_common:sensorialPropertyGroupList.sensorialPropertyType.displayName',
          filterLabel: 'Sensorial',
          title: 'Sensorial property',
        },
        {
          id: 'smartMaterialPropertyType',
          field: 'materials_common:smartMaterialPropertyGroupList.smartMaterialPropertyType.displayName',
          filterLabel: 'Smart material',
          title: 'Smart material property',
        },
        {
          id: 'additionalPropertyType',
          field: 'materials_common:additionalPropertyGroupList.additionalPropertyType.displayName',
          title: 'Additional property',
        },
      ],
    },
    {
      id: 'ecology',
      title: 'Material Ecology',
      filters: [
        {
          id: 'recycledContentQualifier',
          field: 'materials_common:recycledContentGroupList.recycledContentQualifier.displayName',
          filterLabel: 'Recycled',
          title: 'Recycled content',
        },
        {
          id: 'lifecycleComponent',
          field: 'materials_common:lifecycleComponentGroupList.lifecycleComponent.displayName',
          filterLabel: 'Lifecycle',
          title: 'Lifecycle component',
        },
        {
          id: 'certificationProgram',
          field: 'materials_common:certificationCreditGroupList.certificationProgram.displayName',
          filterLabel: 'Certification',
          title: 'Certification program',
        },
      ],
    },
    {
      id: 'processing',
      title: 'Processing',
      filters: [
        {
          id: 'castingProcesses',
          field: 'materials_common:castingProcesses.displayName',
          filterLabel: 'Casting',
          title: 'Casting process',
        },
        {
          id: 'deformingProcesses',
          field: 'materials_common:deformingProcesses.displayName',
          filterLabel: 'Deforming',
          title: 'Deforming process',
        },
        {
          id: 'joiningProcesses',
          field: 'materials_common:joiningProcesses.displayName',
          filterLabel: 'Joining',
          title: 'Joining process',
        },
        {
          id: 'machiningProcesses',
          field: 'materials_common:machiningProcesses.displayName',
          filterLabel: 'Machining',
          title: 'Machining process',
        },
        {
          id: 'moldingProcesses',
          field: 'materials_common:moldingProcesses.displayName',
          filterLabel: 'Molding',
          title: 'Molding process',
        },
        {
          id: 'rapidPrototypingProcesses',
          field: 'materials_common:rapidPrototypingProcesses.displayName',
          filterLabel: 'Rapid prototyping',
          title: 'Rapid prototyping process',
        },
        {
          id: 'surfacingProcesses',
          field: 'materials_common:surfacingProcesses.displayName',
          filterLabel: 'Surfacing',
          title: 'Surfacing process',
        },
        {
          id: 'additionalProcess',
          field: 'materials_common:additionalProcessGroupList.additionalProcess.displayName',
          title: 'Additional process',
        },
      ],
    },
  ],

  advancedSearchFields: [
    // {
    //   id: 'adv-commercialNames',
    //   autoSuggest: true,
    //   field: 'collectionspace_denorm:commercialNames',
    //   title: 'Commercial name',
    // },
    // {
    //   id: 'adv-commonNames',
    //   autoSuggest: true,
    //   field: 'collectionspace_denorm:commonNames',
    //   title: 'Common name',
    // },
    // {
    //   id: 'adv-description',
    //   field: 'materials_common:description',
    //   title: 'Description',
    // },
  ],

  materialDetailFields: [
    [
      {
        category: true,
        label: 'Composition',
        name: 'cat_composition',
        fields: [
          {
            // label: 'Composition',
            name: 'materials_common:materialCompositionGroupList',
            format: listOf(composition),
          },
        ],
      },
      {
        category: true,
        label: 'Typical use',
        name: 'cat_use',
        fields: [
          {
            // label: 'Typical use',
            name: 'materials_common:typicalUses',
            format: inlineListOf(filterLink({
              filterValueFormat: displayName,
            })),
          },
        ],
      },
      {
        category: true,
        label: 'Featured application',
        name: 'cat_application',
        fields: [
          {
            // label: 'Featured application',
            name: 'materials_common:featuredApplicationGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'featuredApplication',
              noteFieldName: 'featuredApplicationNote',
            })),
          },
        ],
      },
      {
        category: true,
        label: 'Production',
        name: 'cat_production',
        fields: [
          {
            label: 'Company',
            name: 'materials_common:materialProductionOrganizationGroupList',
            format: listOf(nameRole({
              nameFieldName: 'materialProductionOrganization',
              roleFieldName: 'materialProductionOrganizationRole',
              linkName: false,
            })),
          },
          {
            label: 'Person',
            name: 'materials_common:materialProductionPersonGroupList',
            format: listOf(nameRole({
              nameFieldName: 'materialProductionPerson',
              roleFieldName: 'materialProductionPersonRole',
              linkName: false,
            })),
          },
          {
            label: 'Place',
            name: 'materials_common:materialProductionPlaceGroupList',
            format: listOf(nameRole({
              nameFieldName: 'materialProductionPlace',
              roleFieldName: 'materialProductionPlaceRole',
              linkName: false,
            })),
          },
          {
            label: 'Date',
            name: 'materials_common:productionDate',
            format: valueAt({ path: 'dateDisplayDate' }),
          },
          {
            label: 'Discontinued',
            name: 'materials_common:discontinued',
            // format: valueAt({ path: 'dateDisplayDate' }),
          },
          {
            label: 'Production Note',
            name: 'materials_common:productionNote',
          },
        ],
      },
      {
        category: true,
        label: 'External links',
        name: 'cat_link',
        fields: [
          {
            // label: 'Links',
            name: 'materials_common:externalUrlGroupList',
            format: listOf(linkText({
              urlFieldName: 'externalUrl',
              textFieldName: 'externalUrlNote',
              type: 'external',
            })),
          },
        ],
      },
      {
        category: true,
        label: 'External standard',
        name: 'cat_standard',
        fields: [
          {
            // label: 'External standard',
            name: 'materials_common:additionalResourceGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'additionalResource',
              noteFieldName: 'additionalResourceNote',
            })),
          },
        ],
      },
      {
        category: true,
        label: 'Form',
        name: 'cat_form',
        fields: [
          {
            label: 'Common form',
            name: 'materials_common:commonForm',
            format: filterLink({
              filterValueFormat: displayName,
            }),
          },
          {
            label: 'Form type',
            name: 'materials_common:formTypeGroupList',
            format: inlineListOf(valueAt({
              path: 'formType',
              format: filterLink({
                filterValueFormat: displayName,
              }),
            })),
          },
        ],
      },
      {
        category: true,
        label: 'Properties',
        name: 'cat_property',
        fields: [
          {
            label: 'Acoustical',
            name: 'materials_common:acousticalPropertyGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'acousticalPropertyType',
              noteFieldName: 'acousticalPropertyNote',
            })),
          },
          {
            label: 'Durability',
            name: 'materials_common:durabilityPropertyGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'durabilityPropertyType',
              noteFieldName: 'durabilityPropertyNote',
            })),
          },
          {
            label: 'Electrical',
            name: 'materials_common:electricalPropertyGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'electricalPropertyType',
              noteFieldName: 'electricalPropertyNote',
            })),
          },
          {
            label: 'Hygro-thermal',
            name: 'materials_common:hygrothermalPropertyGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'hygrothermalPropertyType',
              noteFieldName: 'hygrothermalPropertyNote',
            })),
          },
          {
            label: 'Mechanical',
            name: 'materials_common:mechanicalPropertyGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'mechanicalPropertyType',
              noteFieldName: 'mechanicalPropertyNote',
            })),
          },
          {
            label: 'Optical',
            name: 'materials_common:opticalPropertyGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'opticalPropertyType',
              noteFieldName: 'opticalPropertyNote',
            })),
          },
          {
            label: 'Sensorial',
            name: 'materials_common:sensorialPropertyGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'sensorialPropertyType',
              noteFieldName: 'sensorialPropertyNote',
            })),
          },
          {
            label: 'Smart material',
            name: 'materials_common:smartMaterialPropertyGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'smartMaterialPropertyType',
              noteFieldName: 'smartMaterialPropertyNote',
            })),
          },
          {
            label: 'Additional',
            name: 'materials_common:additionalPropertyGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'additionalPropertyType',
              noteFieldName: 'additionalPropertyNote',
            })),
          },
          {
            label: 'Property note',
            name: 'materials_common:propertyNote',
          },
        ],
      },
    ],
    [
      {
        category: true,
        label: 'Material ecology',
        name: 'cat_ecology',
        fields: [
          {
            label: 'Recycled content',
            name: 'materials_common:recycledContentGroupList',
            format: listOf(numericRange({
              lowFieldName: 'recycledContent',
              highFieldName: 'recycledContentHigh',
              unit: '%',
              qualifierFieldName: 'recycledContentQualifier',
              linkQualifier: true,
            })),
          },
          {
            label: 'Lifecycle component',
            name: 'materials_common:lifecycleComponentGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'lifecycleComponent',
              noteFieldName: 'lifecycleComponentNote',
              noteLabel: '',
              separator: ' - ',
            })),
          },
          {
            label: 'Embodied energy',
            name: 'materials_common:embodiedEnergyGroupList',
            format: listOf(numericRange({
              lowFieldName: 'embodiedEnergyValue',
              highFieldName: 'embodiedEnergyValueHigh',
              unitFieldName: 'embodiedEnergyUnit',
              qualifierFieldName: 'embodiedEnergyNote',
              qualifierSeparator: ' - ',
            })),
          },
          {
            label: 'Certification credit',
            name: 'materials_common:certificationCreditGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'certificationProgram',
              noteFieldName: 'certificationCreditNote',
              noteLabel: '',
              separator: ' - ',
            })),
          },
          {
            label: 'Material ecology note',
            name: 'materials_common:ecologyNote',
          },
        ],
      },
      {
        category: true,
        label: 'Processes',
        name: 'cat_process',
        fields: [
          {
            label: 'Casting',
            name: 'materials_common:castingProcesses',
            format: listOf(filterLink({
              filterValueFormat: displayName,
            })),
          },
          {
            label: 'Joining',
            name: 'materials_common:joiningProcesses',
            format: listOf(filterLink({
              filterValueFormat: displayName,
            })),
          },
          {
            label: 'Molding',
            name: 'materials_common:moldingProcesses',
            format: listOf(filterLink({
              filterValueFormat: displayName,
            })),
          },
          {
            label: 'Surfacing',
            name: 'materials_common:surfacingProcesses',
            format: listOf(filterLink({
              filterValueFormat: displayName,
            })),
          },
          {
            label: 'Deforming',
            name: 'materials_common:deformingProcesses',
            format: listOf(filterLink({
              filterValueFormat: displayName,
            })),
          },
          {
            label: 'Machining',
            name: 'materials_common:machiningProcesses',
            format: listOf(filterLink({
              filterValueFormat: displayName,
            })),
          },
          {
            label: 'Rapid prototyping',
            name: 'materials_common:rapidPrototypingProcesses',
            format: listOf(filterLink({
              filterValueFormat: displayName,
            })),
          },
          {
            label: 'Additional process',
            name: 'materials_common:additionalProcessGroupList',
            format: listOf(valueWithNote({
              valueFieldName: 'additionalProcess',
              noteFieldName: 'additionalProcessNote',
            })),
          },
          {
            label: 'Process note',
            name: 'materials_common:processNote',
          },
        ],
      },
      // TODO: Broader/narrower
    ],
  ],

  sampleTitle: {
    name: 'collectionobjects_common:otherNumberList',
    format: pickFromList({
      condition: {
        path: 'numberType',
        value: 'callnumber',
      },
      format: valueAt({ path: 'numberValue' }),
    }),
  },

  sampleDetailFields: [
    {
      label: 'Call number',
      name: 'collectionobjects_common:otherNumberList',
      format: pickAllFromList({
        condition: {
          path: 'numberType',
          value: 'callnumber',
        },
        format: valueAt({ path: 'numberValue' }),
      }),
      className: 'title',
    },
    {
      label: 'Collection',
      name: 'collectionobjects_common:collection',
      format: displayName,
    },
    {
      label: 'Current location',
      name: 'collectionobjects_common:computedCurrentLocation',
      format: displayName,
    },
    {
      label: 'Physical description',
      name: 'collectionobjects_materials:materialPhysicalDescriptions',
      format: paragraphs,
    },
    {
      name: 'cat_samplecondition',
      category: true,
      fields: [
        {
          label: 'Container',
          name: 'collectionobjects_materials:materialContainerGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'container',
            noteFieldName: 'containerNote',
            linkValue: false,
          })),
        },
        {
          label: 'Condition',
          name: 'collectionobjects_materials:materialConditionGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'condition',
            noteFieldName: 'conditionNote',
            linkValue: false,
          })),
        },
        {
          label: 'Handling',
          name: 'collectionobjects_materials:materialHandlingGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'handling',
            noteFieldName: 'handlingNote',
            linkValue: false,
          })),
        },
      ],
    },
    {
      name: 'cat_sampledescription',
      category: true,
      fields: [
        {
          label: 'Color',
          name: 'collectionobjects_common:colors',
          format: inlineList,
        },
        {
          label: 'Generic color',
          name: 'collectionobjects_materials:materialGenericColors',
          format: inlineListOf(displayName),
        },
        {
          label: 'Finish',
          name: 'collectionobjects_materials:materialFinishGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'finish',
            noteFieldName: 'finishNote',
            linkValue: false,
          })),
        },
      ],
    },
    {
      name: 'cat_holdings',
      category: true,
      inline: true,
      fields: [
        {
          label: 'Holdings',
          name: 'collectionobjects_common:numberOfObjects',
        },
        {
          label: 'Type',
          name: 'collectionobjects_common:objectStatusList',
          format: inlineListOf(objectTypeValue),
        },
      ],
    },
    {
      label: 'Production description',
      name: 'collectionobjects_common:briefDescriptions',
      format: paragraphs,
    },
    {
      label: 'Size',
      name: 'collectionobjects_common:measuredPartGroupList',
      format: listOf(
        valueAt({ path: 'dimensionSummary' }),
      ),
    },
    {
      name: 'cat_samplesystem',
      category: true,
      fields: [
        {
          label: 'System number',
          name: 'collectionobjects_common:objectNumber',
        },
      ],
    },
  ],
};
