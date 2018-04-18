import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import * as mapboxgl from 'mapbox-gl';

import { MapProvider } from '../../providers/map/map';
import { LotsProvider, Lot } from '../../providers/lots/lots';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  lot: Lot;
  map: mapboxgl.Map;

  constructor(private navParams: NavParams,
              private mapProvider: MapProvider,
              private lotsProvider: LotsProvider) {
  }

  ionViewDidLoad() {
    this.mapProvider.initialize();
    this.lotsProvider
      .ready()
      .then(() => {
        try {
          this.lot = this.lotsProvider.getLot(this.navParams.get('lotNumber'));
          this.mapProvider.plotDirections(this.lot.coords);
        } catch(error) {
          console.log(error);
        }
      });
  }

}
