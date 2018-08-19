import React, { Component } from 'react';
import get from 'lodash/get';
import { getDisplayName } from 'cspace-refname';

import {
  ReactiveBase,
  DataSearch,
  MultiList,
  ResultCard,
  ResultList,
  SelectedFilters,
} from '@appbaseio/reactivesearch';

import {
  ReactiveMap,
} from '@appbaseio/reactivemaps';

export default class App extends Component {
  constructor() {
    super();

    this.handleCardViewButtonClick = this.handleCardViewButtonClick.bind(this);
    this.handleListViewButtonClick = this.handleListViewButtonClick.bind(this);
    this.handleMapViewButtonClick = this.handleMapViewButtonClick.bind(this);
    this.handleData = this.handleData.bind(this);

    this.state = {
      view: 'card',
    };
  }

  handleCardViewButtonClick(event) {
    this.setState({
      view: 'card',
    });
  }

  handleListViewButtonClick(event) {
    this.setState({
      view: 'list',
    });
  }

  handleMapViewButtonClick(event) {
    this.setState({
      view: 'map',
    });
  }

  handleData(result) {
    const {
      gatewayUrl,
    } = this.props.config;

    const objectNumber = result['collectionobjects_common:objectNumber'];
    const title = get(result, ['collectionobjects_common:titleGroupList', 0, 'title']);

    const personGroups = get(result, 'collectionobjects_publicart:publicartProductionPersonGroupList');

    const artistNames =
      personGroups &&
      personGroups
        .map(personGroup => personGroup.publicartProductionPerson)
        .filter(refName => !!refName)
        .map(refName => getDisplayName(refName))
        .join(', ');

    const date = get(result, ['collectionobjects_publicart:publicartProductionDateGroupList', 0, 'publicartProductionDate', 'dateDisplayDate']);
    const blobCsid = get(result, 'collectionspace_denorm:blobCsid');

    // HACK: Should be able to use ecm:repository or tenantId to determine the cspace instance for real.

    let imageUrl;

    if (blobCsid) {
      const createdAt = get(result, 'collectionspace_core:createdAt');
      const instance = createdAt && createdAt > '2018-05-21' ? 'ny' : 'ca';

      imageUrl = `${gatewayUrl}/cspace-services-${instance}/blobs/${blobCsid}/derivatives/Medium/content`;
    }

    return {
      image: imageUrl,
      title,
      description: (
        <div>
          <div>{artistNames}</div>
          <div>{date}</div>
          <div>{objectNumber}</div>
        </div>
      ),
    }
  }

  render() {
    const {
      esIndexName,
      gatewayUrl,
    } = this.props.config;

    const {
      view,
    } = this.state;

    let resultView;

    if (view === 'card') {
      resultView = (
        <ResultCard
          componentId="results"
          dataField="collectionobjects_common:titleGroupList.title"
          pagination={true}
          react={{
            and: ['searchBox', 'collectionFacet', 'artistFacet', 'yearFacet', 'placementFacet', 'typeFacet', 'materialFacet']
          }}
          onData={this.handleData}
        />
      );
    } else if (view === 'list') {
      resultView = (
        <ResultList
          componentId="results"
          dataField="collectionobjects_common:titleGroupList.title"
          pagination={true}
          react={{
            and: ['searchBox', 'collectionFacet', 'artistFacet', 'yearFacet', 'placementFacet', 'typeFacet', 'materialFacet']
          }}
          onData={this.handleData}
        />
      );
    } else if (view === 'map') {
      resultView = (
        <ReactiveMap
          autoCenter={true}
          componentId="map"
          dataField="collectionspace_denorm:geoPoint"
          defaultCenter={{ lat: 39.83, lng: -98.58 }}
          defaultZoom={4}
          title="Map"
          react={{
            and: ['searchBox', 'collectionFacet', 'artistFacet', 'yearFacet', 'placementFacet', 'typeFacet', 'materialFacet']
          }}
        />
      );
    }

    return (
      <ReactiveBase
        app={esIndexName}
        type="doc"
        credentials=""
        url={`${gatewayUrl}/es`}
        mapKey=""
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
                and: ['searchBox', 'artistFacet', 'yearFacet', 'placementFacet', 'typeFacet', 'materialFacet']
              }}
            />
            <MultiList
              componentId="artistFacet"
              dataField="collectionobjects_publicart:publicartProductionPersonGroupList.publicartProductionPerson.displayName"
              filterLabel="Artist"
              title="Artist"
              placeholder="Filter"
              react={{
                and: ['searchBox', 'collectionFacet', 'yearFacet', 'placementFacet', 'typeFacet', 'materialFacet'],
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
                and: ['searchBox', 'collectionFacet', 'artistFacet', 'placementFacet', 'typeFacet', 'materialFacet']
              }}
            />
            <MultiList
              componentId="placementFacet"
              dataField="collectionspace_denorm:placementType"
              filterLabel="Placement"
              title="Placement"
              placeholder="Filter"
              react={{
                and: ['searchBox', 'collectionFacet', 'artistFacet', 'yearFacet', 'typeFacet', 'materialFacet']
              }}
            />
            <MultiList
              componentId="typeFacet"
              dataField="collectionobjects_common:objectNameList.objectName.displayName"
              filterLabel="Artwork Type"
              title="Artwork Type"
              placeholder="Filter"
              react={{
                and: ['searchBox', 'collectionFacet', 'artistFacet', 'yearFacet', 'placementFacet', 'materialFacet'],
              }}
            />
            <MultiList
              componentId="materialFacet"
              dataField="collectionobjects_common:materialGroupList.material.displayName"
              filterLabel="Material"
              title="Material"
              placeholder="Filter"
              react={{
                and: ['searchBox', 'collectionFacet', 'artistFacet', 'yearFacet', 'placementFacet', 'typeFacet']
              }}
            />
          </div>
          <div style={{ flex: '1 1 75%' }}>
            <p style={{ textAlign: 'right' }}>
              View:
              <button onClick={this.handleListViewButtonClick}>list</button>
              <button onClick={this.handleCardViewButtonClick}>tile</button>
              <button onClick={this.handleMapViewButtonClick}>map</button>
            </p>
            <SelectedFilters />
            {resultView}
          </div>
        </div>
      </ReactiveBase>
    );
  }
}
