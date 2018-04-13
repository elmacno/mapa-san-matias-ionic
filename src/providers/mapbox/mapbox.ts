import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import * as mapboxgl from 'mapbox-gl';

import { LocationProvider, FALLBACK_POSITION } from '../location/location';

const MAPBOX_URL = 'https://api.mapbox.com';
const DIRECTIONS_URL = `${MAPBOX_URL}/directions/v5/mapbox/driving`;

const IMG_CONFIG = {
  endpoint: `${MAPBOX_URL}/styles/v1/mapbox`,
  style: 'satellite-streets-v10',
  markerUrl: 'https%3A%2F%2Fmaps.google.com%2Fmapfiles%2Fms%2Ficons%2Fred.png',
  zoom: 18.0,
  width: 600,
  height: 400
}

@Injectable()
export class MapboxProvider {

  constructor(private http: HttpClient,
              private location: LocationProvider) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtYWNubyIsImEiOiJjamVvbzUwc3cwNHY0MzNwY3I2eTFiMWMzIn0.iQaY-GcYvY-nArBoyocPNQ';
  }

  imageUrl(coords) {
    return `${IMG_CONFIG.endpoint}/${IMG_CONFIG.style}/static/url-${IMG_CONFIG.markerUrl}(${coords.longitude},${coords.latitude})/${coords.longitude},${coords.latitude},${IMG_CONFIG.zoom},0,0/${IMG_CONFIG.width}x${IMG_CONFIG.height}?access_token=${mapboxgl.accessToken}`
  }

  getETA(destination): Observable<{distance: number, time: number}> {
    let origin = this.location.get();
    return this.http.get(`${DIRECTIONS_URL}/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token=${mapboxgl.accessToken}`)
      .map((result: any) => {
        return {distance: Math.round(result.routes[0].distance / 10) / 100, time: Math.ceil(result.routes[0].duration / 60)};
      });
  }

  createMap(settings: any) {
    settings.center = [
      FALLBACK_POSITION.longitude,
      FALLBACK_POSITION.latitude
    ];
    let map = new mapboxgl.Map(settings);
    this.location
      .ready()
      .then(() => {
        console.log('moving center to:', this.location.get());
        map.on('load', () => {
          map.flyTo({
            center: [
              this.location.get().longitude,
              this.location.get().latitude
            ]
          });
        });
      });
    return map;
  }
}
