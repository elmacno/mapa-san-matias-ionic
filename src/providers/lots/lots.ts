import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

export interface Lot {
  area: number,
  number: number,
  coords: {
    latitude: number,
    longitude: number
  }
}

export interface FetchLotOptions {
  filter: {
    lotNumber: string
  },
  page: {
    size: number,
    num: number
  }
}

export interface FetchLotResults {
  lots: Lot[],
  pageNum: number,
  totalPages: number
}

class FetchLotResultsImpl implements FetchLotResults {
  lots: Lot[];
  pageNum: number;
  totalPages: number;

  constructor(lots: Lot[]) {
    this.lots = lots;
    this.pageNum = -1;
    this.totalPages = 1;
  }
}

@Injectable()
export class LotsProvider {
  lots: Lot[];

  constructor(public http: HttpClient, public events: Events) {
    http.get('/assets/lot_coordinates.json').subscribe((data: Lot[]) => {
      this.lots = data;
      events.publish('lots:ready');
    });
  }

  getLots(options?: FetchLotOptions): FetchLotResults {
    let results = new FetchLotResultsImpl(this.lots);
    if (options) {
      if (options.filter) {
        results.lots = results.lots.filter((item) => {
          let result = true;
          if (options.filter.lotNumber && options.filter.lotNumber != '') {
            result = (item.number+'').includes(options.filter.lotNumber);
          }
          return result;
        });
      }
      if (options.page) {
        results.totalPages = Math.ceil(results.lots.length / options.page.size);
        results.pageNum = options.page.num;
        results.lots = results.lots.slice(options.page.num * options.page.size, (options.page.num + 1) * options.page.size);
      }
    }
    return results;
  }
}
