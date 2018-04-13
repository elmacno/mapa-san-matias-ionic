import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {
  position: {
    previous?: {latitude: number, longitude: number},
    current?: {latitude: number, longitude: number}
  };

  constructor(private geolocation: Geolocation) {
    this.position = {
      previous: {latitude: null, longitude: null},
      current: {latitude: null, longitude: null}
    }
    this.geolocation
      .watchPosition()
      .subscribe((position) => this.updatePosition(position.coords));
  }

  ready(): Promise<boolean> {
    return new Promise((resolve) => {
      this.geolocation
        .getCurrentPosition({maximumAge: 60000, enableHighAccuracy: false})
        .then((position) => {
          this.updatePosition(position.coords);
          console.log('LocationProvider is ready!');
          resolve(true);
        })
        .catch((error) => {
          console.log('Could not get current position:', error)
          this.updatePosition({latitude: -34.360894, longitude: -58.750980})
        });
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
  }
}
