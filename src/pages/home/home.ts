import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LotsProvider, FetchLotResults } from '../../providers/lots/lots';
import { MapboxProvider } from '../../providers/mapbox/mapbox';
import { LocationProvider } from '../../providers/location/location';

class ItemMetadata {
  show: boolean = false;
  imageLoaded: boolean = false;
  distance: number;
  time: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lots: FetchLotResults;
  lotNumber: number;
  itemsMetadata: ItemMetadata[];
  // map: mapboxgl.Map;
  // container: string = 'map';
  // style: string = 'mapbox://styles/mapbox/streets-v10';

  constructor(public navCtrl: NavController,
              private lotsProvider: LotsProvider,
              private mapboxProvider: MapboxProvider,
              private locationProvider: LocationProvider) {
    this.lots = {
      lots: [],
      pageNum: -1,
      totalPages: 1
    }
    this.itemsMetadata = [];
  }

  ionViewDidLoad() {

    this.lotsProvider
      .ready()
      .then(() => {
        this.fetchMoreLots();
      });
  //   this.map = new mapboxgl.Map({
  //     container: this.container,
  //     style: this.style,
  //     zoom: 16,
  //     center: [-58.75139, -34.36074]
  //   });
  }

  fetchMoreLots() {
    if (this.lots.pageNum < this.lots.totalPages) {
      let moreLots = this.lotsProvider.getLots({
        filter: {
          lotNumber: this.lotNumber ? this.lotNumber.toString() : ''
        },
        page: {
          size: 20,
          num: this.lots.pageNum + 1
        }
      });
      this.lots.lots = this.lots.lots.concat(moreLots.lots);
      this.lots.pageNum = moreLots.pageNum;
      this.lots.totalPages = moreLots.totalPages;
      for (let i = 0; i < this.lots.lots.length; i++) {
        if (i == this.itemsMetadata.length) {
          this.itemsMetadata.push(new ItemMetadata());
        }
      }
    }
  }

  addLots(infiniteScroll) {
    this.fetchMoreLots();
    infiniteScroll.complete();
  }

  onLotNumberChange() {
    this.lots = {
      lots: [],
      pageNum: -1,
      totalPages: 1
    };
    this.itemsMetadata = [];
    this.fetchMoreLots();
  }

  toggleDetails(lotIndex) {
    this.itemsMetadata[lotIndex].show = !this.itemsMetadata[lotIndex].show;
    if (this.itemsMetadata[lotIndex].show &&
        !(this.itemsMetadata[lotIndex].distance || this.itemsMetadata[lotIndex].time)) {
      this.locationProvider
        .ready()
        .then(() => {
          this.mapboxProvider
            .getETA(this.lots.lots[lotIndex].coords)
            .subscribe(({distance, time}) => {
              this.itemsMetadata[lotIndex].distance = distance;
              this.itemsMetadata[lotIndex].time = time;
            });
        });
    }
  }
}
