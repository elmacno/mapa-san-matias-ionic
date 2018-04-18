import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Events } from 'ionic-angular';

export const FALLBACK_POSITION = {
  latitude: -34.360894,
  longitude: -58.750980
};

@Injectable()
export class LocationProvider {
  position: {
    previous?: {latitude: number, longitude: number},
    current?: {latitude: number, longitude: number}
  };

  constructor(private geolocation: Geolocation,
              private events: Events) {
    this.position = {
      previous: null,
      current: null
    }
    this.geolocation
      .watchPosition()
      .subscribe((position) => this.updatePosition(position.coords));
  }

  ready(): Promise<boolean> {
    return new Promise((resolve) => {
      let waitForPosition = () => {
        if (!this.position.current) {
          setTimeout(waitForPosition, 500);
        } else {
          resolve(true);
        }
      }
      waitForPosition();
    });
  }

  get(): {latitude: number, longitude: number} {
    return this.position.current;
  }

  previous(): {latitude: number, longitude: number} {
    return this.position.previous;
  }

  private updatePosition(coords) {
    if (this.position.current) {
      this.position.previous = this.position.current;
    }
    this.position.current = {
      longitude: coords.longitude,
      latitude: coords.latitude
    }
    this.events.publish('location:update');
  }
}
