import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { LotsProvider } from './lots/lots';
import { MapboxProvider } from './mapbox/mapbox';
import { LocationProvider } from './location/location';

@NgModule({
	imports: [],
	providers: [
    Geolocation,
    LotsProvider,
    MapboxProvider,
    LocationProvider
  ]
})
export class ProvidersModule {}
