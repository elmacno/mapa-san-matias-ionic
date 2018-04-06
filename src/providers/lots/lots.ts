import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

export interface Lot {
  area: number,
  number: number,
  coords: {
    latitude: number,
    longitude: number
  }
}

@Injectable()
export class LotsProvider {
  lots: Lot[];
  lotsReady: EventEmitter<boolean>;

  constructor(public http: HttpClient) {
    this.lotsReady = new EventEmitter<boolean>();
    http.get('/assets/lot_coordinates.json').subscribe((data: Lot[]) => {
      this.lots = data;
      this.lotsReady.emit(true);
    });
  }

  ready() {
    return this.lotsReady;
  }

  getLots(): Lot[] {
    return this.lots;
  }
}
