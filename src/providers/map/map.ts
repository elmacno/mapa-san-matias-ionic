import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import * as mapboxgl from 'mapbox-gl';
import * as polyline from '@mapbox/polyline';

import { LocationProvider, FALLBACK_POSITION } from '../location/location';
import { MapboxProvider } from '../mapbox/mapbox';

const MAP_SETTINGS = {
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v10',
  zoom: 16,
  center: [
    FALLBACK_POSITION.longitude,
    FALLBACK_POSITION.latitude
  ]
};

const DEFAULT_ROUTE_LAYER = {
  id: 'route',
  type: 'line',
  source: {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [],
        type: 'LineString'
      }
    }
  },
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#0093ff',
    'line-width': 8
  }
}

@Injectable()
export class MapProvider {
  map: mapboxgl.Map;
  markers: {current: mapboxgl.Marker, destination: mapboxgl.Marker };
  routeIsReady: boolean = false;
  isNavigating: boolean = false;

  constructor(private locationProvider: LocationProvider,
              private mapboxProvider: MapboxProvider,
              private events: Events) {
  }

  initialize() {
    this.map = new mapboxgl.Map(JSON.parse(JSON.stringify(MAP_SETTINGS)));
    this.markers = {current: null, destination: null};
    this.drawCurrentPositionMarker();
  }

  plotDirections(to: {latitude: number, longitude: number}) {
    this.locationProvider
      .ready()
      .then(() => {
        let from = this.locationProvider.get();
        this.mapboxProvider
          .getDirections(from, to)
          .subscribe((results: mapboxgl.Route) => {
            let layerSettings = JSON.parse(JSON.stringify(DEFAULT_ROUTE_LAYER))
            results.routes[0].legs[0].steps.forEach((step) => {
              let geojsonLine = polyline.toGeoJSON(step.geometry);
              layerSettings.source.data.geometry.coordinates = layerSettings.source.data.geometry.coordinates.concat(geojsonLine.coordinates);
            });
            this.map.addLayer(layerSettings);
            this.fitWholeRouteinMap(layerSettings.source.data.geometry.coordinates);
            this.markers.destination = new mapboxgl.Marker(this.createDestinationElement()).setLngLat([to.longitude, to.latitude]).addTo(this.map);
            this.routeIsReady = true;
          });
      });
  }

  fitWholeRouteinMap(path) {
    let min: {latitude: number, longitude: number};
    let max: {latitude: number, longitude: number};
    path.forEach((coords) => {
      if (!min) min = {longitude: coords[0], latitude: coords[1]}
      if (!max) max = {longitude: coords[0], latitude: coords[1]}
      if (coords[0] < min.longitude) min.longitude = coords[0];
      if (coords[1] < min.latitude) min.latitude = coords[1];
      if (coords[0] > max.longitude) max.longitude = coords[0];
      if (coords[1] > max.latitude) max.latitude = coords[1];
    });
    this.map.fitBounds([
      [min.longitude, min.latitude],
      [max.longitude, max.latitude]
    ], {
      padding: 40
    });
  }

  updateCurrentPositionMarker() {
    let position = this.locationProvider.get();
    if (!this.markers.current) {
      this.markers.current = new mapboxgl.Marker(this.createCurrentPositionElement()).setLngLat([position.longitude, position.latitude]).addTo(this.map);
    }
    this.markers.current.setLngLat([position.longitude, position.latitude]);
  }

  drawCurrentPositionMarker() {
    this.locationProvider
      .ready()
      .then(() => this.updateCurrentPositionMarker());
    this.events
      .subscribe('location:update', () => this.updateCurrentPositionMarker());
  }

  createCurrentPositionElement() {
    let element = document.createElement('div');
    element.style.backgroundImage = "url(assets/imgs/arrow.png)";
    element.style.width = '23px';
    element.style.height = '28px';
    return element;
  }

  createDestinationElement() {
    let element = document.createElement('div');
    element.style.backgroundImage = "url(assets/imgs/finish.png)";
    element.style.width = '23px';
    element.style.height = '68px';
    //element.style.transform = 'translateY(-50%)';
    element.className = 'destination-marker';
    return element;
  }

  startNavigating() {
    this.isNavigating = true;
    this.map.easeTo({
      center: [this.locationProvider.get().longitude, this.locationProvider.get().latitude],
      zoom: 18
    })
  }

  canNavigate() {
    return new Promise((resolve) => {
      let waitForRoute = () => {
        if (!this.routeIsReady) {
          setTimeout(waitForRoute, 500);
        } else {
          resolve(true);
        }
      }
      waitForRoute();
    });
  }
}
