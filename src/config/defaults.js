export default {
  basename: '',
  container: '#cspace-browser',
  esIndexName: 'core',
  gatewayUrl: 'http://localhost:8181',

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
      id: 'genmaterialCompositionGenericName',
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
      title: 'Producer',
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
};
