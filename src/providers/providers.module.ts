import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { LotsProvider } from './lots/lots';
import { MapboxProvider } from './mapbox/mapbox';
import { LocationProvider } from './location/location';
import { GeolocationMock } from './location/geolocation.mock';
import { MapProvider } from './map/map';

@NgModule({
	imports: [],
	providers: [
    Geolocation,
    LotsProvider,
    MapboxProvider,
    LocationProvider,
    GeolocationMock,
    MapProvider
  ]
})
export class ProvidersModule {}
