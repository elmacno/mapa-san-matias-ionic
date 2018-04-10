import { Component } from '@angular/core';
import { NavController, Events, LoadingController, Loading } from 'ionic-angular';
//import * as mapboxgl from 'mapbox-gl';

import { LotsProvider, FetchLotResults } from '../../providers/lots/lots';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lots: FetchLotResults;
  lotNumber: number;
  showLotDetails: boolean[];
  loading: Loading;
  // map: mapboxgl.Map;
  // container: string = 'map';
  // style: string = 'mapbox://styles/mapbox/streets-v10';

  constructor(public navCtrl: NavController,
              public events: Events,
              private lotsProvider: LotsProvider) {
    this.lots = {
      lots: [],
      pageNum: -1,
      totalPages: 1
    }
    this.showLotDetails = [];
    //mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtYWNubyIsImEiOiJjamVvbzUwc3cwNHY0MzNwY3I2eTFiMWMzIn0.iQaY-GcYvY-nArBoyocPNQ';
  }

  ionViewDidLoad() {
    this.events
      .subscribe('lots:ready', () => {
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
        if (i == this.showLotDetails.length) {
          this.showLotDetails.push(false);
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
    this.showLotDetails = [];
    this.fetchMoreLots();
  }

  toggleDetails(lotIndex) {
    this.showLotDetails[lotIndex] = !this.showLotDetails[lotIndex];
  }

  buildStaticImageUrl(lot) {
    return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/static/url-https%3A%2F%2Fmaps.google.com%2Fmapfiles%2Fms%2Ficons%2Fred.png(${lot.coords.longitude},${lot.coords.latitude})/${lot.coords.longitude},${lot.coords.latitude},18.0,0,0/600x400?access_token=pk.eyJ1IjoiZWxtYWNubyIsImEiOiJjamVvbzUwc3cwNHY0MzNwY3I2eTFiMWMzIn0.iQaY-GcYvY-nArBoyocPNQ`
  }
}
