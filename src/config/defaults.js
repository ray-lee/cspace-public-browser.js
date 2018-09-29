import {
  collectionValue,
  composition,
  displayName,
  filterLink,
  linkText,
  list,
  listOf,
  nameRole,
  nameValue,
  numberTypeValue,
  numericRange,
  paragraphs,
  property,
  valueAt,
  valueWithNote,
} from '../helpers/formatHelpers';

export default {
  basename: '',
  container: '#cspace-browser',
  esIndexName: 'materials',
  gatewayUrl: 'http://localhost:8181',

  institutions: {
    test: {
      title: 'Test Institution',
      esIndexName: 'materials',
      gatewayUrl: 'http://localhost:8181',
    },
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

  sortField: 'collectionspace_denorm:title',
  storageKey: 'mo', // 'cspace-public-browser',

  types: {
    CollectionObject: {
      title: null,
      description: null,
    },
    Materialitem: {
      sort: 'collectionspace_denorm:title',
      title: data => data['collectionspace_denorm:title'],
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
      description: (data) => {
        const materialTermGroups = data['materials_common:materialTermGroupList'];

        if (materialTermGroups.length > 1) {
          return materialTermGroups[1].termDisplayName;
        }

        return undefined;
      },
    },
  },

  filters: [
    {
      id: 'materialCompositionFamilyName',
      field: 'materials_common:materialCompositionGroupList.materialCompositionFamilyName.displayName',
      filterLabel: 'Family',
      title: 'Composition: Family name',
    },
    {
      id: 'materialCompositionClassName',
      field: 'materials_common:materialCompositionGroupList.materialCompositionClassName.displayName',
      filterLabel: 'Class',
      title: 'Composition: Class name',
    },
    {
      id: 'materialCompositionGenericName',
      field: 'materials_common:materialCompositionGroupList.materialCompositionGenericName.displayName',
      filterLabel: 'Generic',
      title: 'Composition: Generic name',
    },
    {
      id: 'typicalUses',
      field: 'materials_common:typicalUses.displayName',
      title: 'Typical use',
    },
    {
      id: 'materialProductionOrganization',
      field: 'materials_common:materialProductionOrganizationGroupList.materialProductionOrganization.displayName',
      title: 'Production organization',
    },
    {
      id: 'materialProductionPerson',
      field: 'materials_common:materialProductionPersonGroupList.materialProductionPerson.displayName',
      title: 'Production person',
    },
    {
      id: 'materialProductionPlace',
      field: 'materials_common:materialProductionPlaceGroupList.materialProductionPlace.displayName',
      title: 'Production place',
    },
    {
      id: 'featuredApplication',
      field: 'materials_common:featuredApplicationGroupList.featuredApplication.displayName',
      title: 'Featured application',
    },
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
    {
      id: 'castingProcesses',
      field: 'materials_common:castingProcesses.displayName',
      filterLabel: 'Casting',
      title: 'Casting process',
    },
    {
      id: 'joiningProcesses',
      field: 'materials_common:joiningProcesses.displayName',
      filterLabel: 'Joining',
      title: 'Joining process',
    },
    {
      id: 'moldingProcesses',
      field: 'materials_common:moldingProcesses.displayName',
      filterLabel: 'Molding',
      title: 'Molding process',
    },
    {
      id: 'surfacingProcesses',
      field: 'materials_common:surfacingProcesses.displayName',
      filterLabel: 'Surfacing',
      title: 'Surfacing process',
    },
    {
      id: 'deformingProcesses',
      field: 'materials_common:deformingProcesses.displayName',
      filterLabel: 'Deforming',
      title: 'Deforming process',
    },
    {
      id: 'machiningProcesses',
      field: 'materials_common:machiningProcesses.displayName',
      filterLabel: 'Machining',
      title: 'Machining process',
    },
    {
      id: 'rapidPrototypingProcesses',
      field: 'materials_common:rapidPrototypingProcesses.displayName',
      filterLabel: 'Rapid prototyping',
      title: 'Rapid prototyping process',
    },
    {
      id: 'additionalProcess',
      field: 'materials_common:additionalProcessGroupList.additionalProcess.displayName',
      title: 'Additional process',
    },
  ],

  advancedSearchFields: [
    {
      id: 'adv-commercialNames',
      autoSuggest: true,
      field: 'collectionspace_denorm:commercialNames',
      title: 'Commercial name',
    },
    {
      id: 'adv-commonNames',
      autoSuggest: true,
      field: 'collectionspace_denorm:commonNames',
      title: 'Common name',
    },
    {
      id: 'adv-description',
      field: 'materials_common:description',
      title: 'Description',
    },
  ],

  materialDetailFields: [
    {
      category: true,
      label: 'Composition',
      name: 'cat_composition',
    },
    {
      label: 'Composition',
      name: 'materials_common:materialCompositionGroupList',
      format: listOf(composition),
    },
    {
      category: true,
      label: 'Use',
      name: 'cat_use',
    },
    {
      label: 'Typical use',
      name: 'materials_common:typicalUses',
      format: listOf(filterLink({
        filterValueFormat: displayName,
      })),
    },
    {
      label: 'Featured application',
      name: 'materials_common:featuredApplicationGroupList',
      format: listOf(valueWithNote({
        valueFieldName: 'featuredApplication',
        noteFieldName: 'featuredApplicationNote',
      })),
    },
    {
      category: true,
      label: 'Production',
      name: 'cat_production',
    },
    {
      label: 'Production organization',
      name: 'materials_common:materialProductionOrganizationGroupList',
      format: listOf(nameRole({
        nameFieldName: 'materialProductionOrganization',
        roleFieldName: 'materialProductionOrganizationRole',
      })),
    },
    {
      label: 'Production person',
      name: 'materials_common:materialProductionPersonGroupList',
      format: listOf(nameRole({
        nameFieldName: 'materialProductionPerson',
        roleFieldName: 'materialProductionPersonRole',
        linkName: false,
      })),
    },
    {
      label: 'Production place',
      name: 'materials_common:materialProductionPlaceGroupList',
      format: listOf(nameRole({
        nameFieldName: 'materialProductionPlace',
        roleFieldName: 'materialProductionPlaceRole',
        linkName: false,
      })),
    },
    {
      category: true,
      label: 'Form',
      name: 'cat_form',
    },
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
      format: listOf(valueAt({
        path: 'formType',
        format: filterLink({
          filterValueFormat: displayName,
        }),
      })),
    },
    {
      category: true,
      label: 'Properties',
      name: 'cat_property',
    },
    {
      label: 'Acoustical property',
      name: 'materials_common:acousticalPropertyGroupList',
      format: listOf(property({
        nameFieldName: 'acousticalPropertyType',
        valueFieldName: 'acousticalPropertyNote',
      })),
    },
    {
      label: 'Durability property',
      name: 'materials_common:durabilityPropertyGroupList',
      format: listOf(property({
        nameFieldName: 'durabilityPropertyType',
        valueFieldName: 'durabilityPropertyNote'
      })),
    },
    {
      label: 'Electrical property',
      name: 'materials_common:electricalPropertyGroupList',
      format: listOf(property({
        nameFieldName: 'electricalPropertyType',
        valueFieldName: 'electricalPropertyNote',
      })),
    },
    {
      label: 'Hygro-thermal property',
      name: 'materials_common:hygrothermalPropertyGroupList',
      format: listOf(property({
        nameFieldName: 'hygrothermalPropertyType',
        valueFieldName: 'hygrothermalPropertyNote',
      })),
    },
    {
      label: 'Mechanical property',
      name: 'materials_common:mechanicalPropertyGroupList',
      format: listOf(property({
        nameFieldName: 'mechanicalPropertyType',
        valueFieldName: 'mechanicalPropertyNote'
      })),
    },
    {
      label: 'Optical property',
      name: 'materials_common:opticalPropertyGroupList',
      format: listOf(property({
        nameFieldName: 'opticalPropertyType',
        valueFieldName: 'opticalPropertyNote',
      })),
    },
    {
      label: 'Sensorial property',
      name: 'materials_common:sensorialPropertyGroupList',
      format: listOf(property({
        nameFieldName: 'sensorialPropertyType',
        valueFieldName: 'sensorialPropertyNote',
      })),
    },
    {
      label: 'Smart material property',
      name: 'materials_common:smartMaterialPropertyGroupList',
      format: listOf(property({
        nameFieldName: 'smartMaterialPropertyType',
        valueFieldName: 'smartMaterialPropertyNote',
      })),
    },
    {
      label: 'Additional property',
      name: 'materials_common:additionalPropertyGroupList',
      format: listOf(property({
        nameFieldName: 'additionalPropertyType',
        valueFieldName: 'additionalPropertyNote',
      })),
    },
    {
      category: true,
      label: 'Material Ecologies',
      name: 'cat_ecology',
    },
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
      format: listOf(property({
        nameFieldName: 'lifecycleComponent',
        valueFieldName: 'lifecycleComponentNote',
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
      })),
    },
    {
      label: 'Certification credit',
      name: 'materials_common:certificationCreditGroupList',
      format: listOf(property({
        nameFieldName: 'certificationProgram',
        valueFieldName: 'certificationCreditNote',
      })),
    },
    {
      category: true,
      label: 'Processes',
      name: 'cat_process',
    },
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
      format: listOf(property({
        nameFieldName: 'additionalProcess',
        valueFieldName: 'additionalProcessNote',
      })),
    },
    {
      category: true,
      label: 'External Links',
      name: 'cat_link',
    },
    {
      label: 'Links',
      name: 'materials_common:externalUrlGroupList',
      format: listOf(linkText({
        urlFieldName: 'externalUrl',
        textFieldName: 'externalUrlNote',
        type: 'external',
      })),
    },
    // TODO: Broader/narrower
  ],

  sampleDetailFields: [
    {
      label: 'Description',
      name: 'collectionobjects_common:briefDescriptions',
      format: list,
    },
    {
      label: 'Number',
      name: 'collectionobjects_common:otherNumberList',
      format: listOf(nameValue({
        nameFormat: valueAt({
          path: 'numberType',
          format: numberTypeValue,
        }),
        valueFormat: valueAt({
          path: 'numberValue',
        }),
      })),
    },
    {
      label: 'Collection',
      name: 'collectionobjects_common:collection',
      format: collectionValue,
    },
    {
      label: 'Color',
      name: 'collectionobjects_common:colors',
      format: list,
    },
    {
      label: 'Physical description',
      name: 'collectionobjects_materials:materialPhysicalDescriptions',
      format: paragraphs,
    },
  ],
};
