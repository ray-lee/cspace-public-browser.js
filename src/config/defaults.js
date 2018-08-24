import React from 'react';
import { joinFields, findFirstValue } from '../helpers/dataHelpers';
import { getDisplayName } from 'cspace-refname';

export default {
  container: '#cspace-browser',
  esIndexName: 'core',
  gatewayUrl: 'http://localhost:8181',

  defaultQuery: {
    // term: {
    //   'ecm:primaryType': 'CollectionObject',
    // }
    term: {
      'ecm:primaryType': 'Materialitem',
    }
  },

  sortField: 'collectionspace_denorm:title',

  types: {
    CollectionObject: {
      title: null,
      description: null,
    },
    Materialitem: {
      sort: 'collectionspace_denorm:title',
      title: (data) => {
        const title = data['collectionspace_denorm:title'];

        if (!title) {
          return undefined;
        }

        return title
          .split('\n')
          .map((line, index) => <React.Fragment key={index}>{line}<br /></React.Fragment>)
      },
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
      description: data =>
        joinFields({
          data,
          separator: ' › ', //→›·
          paths: [
            ['materials_common:materialCompositionGroupList', 0, 'materialCompositionFamilyName'],
            ['materials_common:materialCompositionGroupList', 0, 'materialCompositionClassName'],
            ['materials_common:materialCompositionGroupList', 0, 'materialCompositionGenericName'],
          ],
          formatters: Array(3).fill(getDisplayName),
        }),
    },
  },

  filters: [
    {
      id: 'materialCompositionFamilyName',
      field: 'materials_common:materialCompositionGroupList.materialCompositionFamilyName.displayName',
      title: 'Composition - Family',
    },
    {
      id: 'materialCompositionClassName',
      field: 'materials_common:materialCompositionGroupList.materialCompositionClassName.displayName',
      title: 'Composition - Class',
    },
    {
      id: 'genmaterialCompositionGenericName',
      field: 'materials_common:materialCompositionGroupList.materialCompositionGenericName.displayName',
      title: 'Composition - Generic',
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
      title: 'Acoustical property',
    },
    {
      id: 'durabilityPropertyType',
      field: 'materials_common:durabilityPropertyGroupList.durabilityPropertyType.displayName',
      title: 'Durability property',
    },
    {
      id: 'electricalPropertyType',
      field: 'materials_common:electricalPropertyGroupList.electricalPropertyType.displayName',
      title: 'Electrical property',
    },
    {
      id: 'hygrothermalPropertyType',
      field: 'materials_common:hygrothermalPropertyGroupList.hygrothermalPropertyType.displayName',
      title: 'Hygrothermal property',
    },
    {
      id: 'mechanicalPropertyType',
      field: 'materials_common:mechanicalPropertyGroupList.mechanicalPropertyType.displayName',
      title: 'Mechanical property',
    },
    {
      id: 'opticalPropertyType',
      field: 'materials_common:opticalPropertyGroupList.opticalPropertyType.displayName',
      title: 'Optical property',
    },
    {
      id: 'sensorialPropertyType',
      field: 'materials_common:sensorialPropertyGroupList.sensorialPropertyType.displayName',
      title: 'Sensorial property',
    },
    {
      id: 'smartMaterialPropertyType',
      field: 'materials_common:smartMaterialPropertyGroupList.smartMaterialPropertyType.displayName',
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
      title: 'Recycled content',
    },
    {
      id: 'lifecycleComponent',
      field: 'materials_common:lifecycleComponentGroupList.lifecycleComponent.displayName',
      title: 'Lifecycle component',
    },
    {
      id: 'certificationProgram',
      field: 'materials_common:certificationCreditGroupList.certificationProgram.displayName',
      title: 'Certification program',
    },
    {
      id: 'castingProcesses',
      field: 'materials_common:castingProcesses.displayName',
      title: 'Casting process',
    },
    {
      id: 'joiningProcesses',
      field: 'materials_common:joiningProcesses.displayName',
      title: 'Joining process',
    },
    {
      id: 'moldingProcesses',
      field: 'materials_common:moldingProcesses.displayName',
      title: 'Molding process',
    },
    {
      id: 'surfacingProcesses',
      field: 'materials_common:surfacingProcesses.displayName',
      title: 'Surfacing process',
    },
    {
      id: 'deformingProcesses',
      field: 'materials_common:deformingProcesses.displayName',
      title: 'Deforming process',
    },
    {
      id: 'machiningProcesses',
      field: 'materials_common:machiningProcesses.displayName',
      title: 'Machining process',
    },
    {
      id: 'rapidPrototypingProcesses',
      field: 'materials_common:rapidPrototypingProcesses.displayName',
      title: 'Rapid prototyping process',
    },
    {
      id: 'additionalProcess',
      field: 'materials_common:additionalProcessGroupList.additionalProcess.displayName',
      title: 'Additional process',
    },
  ],
};
