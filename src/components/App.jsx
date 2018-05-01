import React, { Component } from 'react';
import get from 'lodash/get';
import { getDisplayName } from 'cspace-refname';

import {
  ReactiveBase,
  DataSearch,
  MultiList,
  ResultCard,
  SelectedFilters,
} from '@appbaseio/reactivesearch';

export default class App extends Component {
  constructor() {
    super();

    this.handleData = this.handleData.bind(this);
  }

  handleData(result) {
    const objectNumber = result['collectionobjects_common:objectNumber'];
    const title = get(result, ['collectionobjects_common:titleGroupList', 0, 'title']);
    const artist = getDisplayName(get(result, ['collectionobjects_publicart:publicartProductionPersonGroupList', 0, 'publicartProductionPerson']));
    const date = get(result, ['collectionobjects_publicart:publicartProductionDateGroupList', 0, 'publicartProductionDate', 'dateDisplayDate']);

    return {
      // image: 'http://www.asfera.info/files/images/1_aprela/4/deloreyn.jpg',
      title,
      description: (
        <div>
          <div>{artist}</div>
          <div>{date}</div>
          <div>{objectNumber}</div>
        </div>
      ),
    }
  }

  render(props) {
    return (
      <ReactiveBase
        app="publicart"
        type="doc"
        credentials=""
        url="http://localhost:8181/es"
      >
        <DataSearch
          componentId="searchBox"
          dataField="_all"
          placeholder="Search"
          filterLabel="Search"
          style={{ marginBottom: '1em' }}
        />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1 1 25%', margin: '10px 10px 0 0' }}>
            <MultiList
              componentId="collectionFacet"
              dataField="collectionobjects_publicart:publicartCollections.displayName"
              filterLabel="Collection"
              title="Collection"
              placeholder="Filter"
              react={{
                and: ['searchBox', 'artistFacet', 'yearFacet', 'typeFacet', 'materialFacet']
              }}
            />
            <MultiList
              componentId="artistFacet"
              dataField="collectionobjects_publicart:publicartProductionPersonGroupList.publicartProductionPerson.displayName"
              filterLabel="Artist"
              title="Artist"
              placeholder="Filter"
              react={{
                and: ['searchBox', 'collectionFacet', 'yearFacet', 'typeFacet', 'materialFacet'],
              }}
            />
            {/* TODO: Could use RangeSlider/DynamicRangeSlider to show a histogram if we use a newer version of ES. */}
            <MultiList
              componentId="yearFacet"
              dataField="collectionobjects_publicart:publicartProductionDateGroupList.publicartProductionDate.dateEarliestSingleYear"
              filterLabel="Year"
              title="Year"
              placeholder="Filter"
              react={{
                and: ['searchBox', 'collectionFacet', 'artistFacet', 'typeFacet', 'materialFacet']
              }}
            />
            <MultiList
              componentId="typeFacet"
              dataField="collectionobjects_common:objectNameList.objectName.displayName"
              filterLabel="Artwork Type"
              title="Artwork Type"
              placeholder="Filter"
              react={{
                and: ['searchBox', 'collectionFacet', 'artistFacet', 'yearFacet', 'materialFacet'],
              }}
            />
            <MultiList
              componentId="materialFacet"
              dataField="collectionobjects_common:materialGroupList.material.displayName"
              filterLabel="Material"
              title="Material"
              placeholder="Filter"
              react={{
                and: ['searchBox', 'collectionFacet', 'artistFacet', 'yearFacet', 'typeFacet']
              }}
            />
          </div>
          <div style={{ flex: '1 1 75%' }}>
            <SelectedFilters />
            <ResultCard
              componentId="results"
              dataField="_all"
              pagination={true}
              react={{
                and: ['searchBox', 'collectionFacet', 'artistFacet', 'yearFacet', 'typeFacet', 'materialFacet']
              }}
              onData={this.handleData}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}
