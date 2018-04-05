import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//import * as mapboxgl from 'mapbox-gl';

export interface Lot {
  area: number,
  number: number,
  coords: {
    latitude: number,
    longitude: number
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lotsCollection: AngularFirestoreCollection<Lot>;
  lots: Observable<Lot[]>;

  // map: mapboxgl.Map;
  // container: string = 'map';
  // style: string = 'mapbox://styles/mapbox/streets-v10';

  constructor(public navCtrl: NavController, afStore: AngularFirestore, http: HttpClient) {
    this.lotsCollection = afStore.collection('lots');
    this.lots = this.lotsCollection.valueChanges();
    //mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtYWNubyIsImEiOiJjamVvbzUwc3cwNHY0MzNwY3I2eTFiMWMzIn0.iQaY-GcYvY-nArBoyocPNQ';
    // http.get('/assets/lot_coordinates.json').subscribe((lots) => {
    //     lots.forEach(lot => {
    //       this.lotsCollection.add({
    //         area: lot.area,
    //         number: lot.number,
    //         coords: {
    //           latitude: lot.latitude,
    //           longitude: lot.longitude
    //         }
    //       }).catch(result => console.log(result));
    //     });
    //   });
  }

  // ionViewDidLoad() {
  //   this.map = new mapboxgl.Map({
  //     container: this.container,
  //     style: this.style,
  //     zoom: 16,
  //     center: [-58.75139, -34.36074]
  //   });
  // }

}
