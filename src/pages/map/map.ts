import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as mapboxgl from 'mapbox-gl';

import { MapboxProvider } from '../../providers/mapbox/mapbox';
import { LotsProvider, Lot } from '../../providers/lots/lots';

const MAP_SETTINGS = {
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v10',
  zoom: 16
};

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  lot: Lot;
  map: mapboxgl.Map;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private mapboxProvider: MapboxProvider,
              lotsProvider: LotsProvider) {
    lotsProvider
      .ready()
      .then(() => {
        try {
          this.lot = lotsProvider.getLot(this.navParams.get('lotNumber'));
        } catch(error) {
          console.log(error);
        }
      });
  }

  ionViewDidLoad() {
    this.map = this.mapboxProvider.createMap(MAP_SETTINGS);
    //   this.map = new mapboxgl.Map({
    //     container: this.container,
    //     style: this.style,
    //     zoom: 16,
    //     center: [-58.75139, -34.36074]
    //   });
  }

}
