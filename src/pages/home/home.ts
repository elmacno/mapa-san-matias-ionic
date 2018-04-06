import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import * as mapboxgl from 'mapbox-gl';

import { LotsProvider, Lot } from '../../providers/lots/lots';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lots: Lot[];
  lotNumber: number;
  showLotDetails: boolean[];
  // map: mapboxgl.Map;
  // container: string = 'map';
  // style: string = 'mapbox://styles/mapbox/streets-v10';

  constructor(public navCtrl: NavController,
              private lotsProvider: LotsProvider) {
    this.showLotDetails = [];
    //mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtYWNubyIsImEiOiJjamVvbzUwc3cwNHY0MzNwY3I2eTFiMWMzIn0.iQaY-GcYvY-nArBoyocPNQ';
  }

  ionViewDidLoad() {
    this.lotsProvider
      .ready()
      .subscribe(() => {
        this.lots = this.lotsProvider.getLots();
        this.lots.forEach(() => this.showLotDetails.push(false));
      })

  //   this.map = new mapboxgl.Map({
  //     container: this.container,
  //     style: this.style,
  //     zoom: 16,
  //     center: [-58.75139, -34.36074]
  //   });
  }

  toggleDetails(lotIndex) {
    this.showLotDetails[lotIndex] = !this.showLotDetails[lotIndex];
  }

  buildStaticImageUrl(lot) {
    return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/static/url-https%3A%2F%2Fmaps.google.com%2Fmapfiles%2Fms%2Ficons%2Fred.png(${lot.coords.longitude},${lot.coords.latitude})/${lot.coords.longitude},${lot.coords.latitude},18.0,0,0/600x400?access_token=pk.eyJ1IjoiZWxtYWNubyIsImEiOiJjamVvbzUwc3cwNHY0MzNwY3I2eTFiMWMzIn0.iQaY-GcYvY-nArBoyocPNQ`
  }

  public onKeyDown(event: any) {

    let newValue = event.target.value;

    if (parseInt(newValue) > event.target.max) {
      event.target.value = newValue.slice(0, -1);
    }
  }
}
