import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Diagnostic } from '@ionic-native/diagnostic';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              diagnostic: Diagnostic) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      if (platform.is('android')) {
        diagnostic.requestRuntimePermission(diagnostic.permission.ACCESS_FINE_LOCATION)
          .then((data) => {
            console.log('Fine location authorization result:', data)
            diagnostic.requestRuntimePermission(diagnostic.permission.ACCESS_COARSE_LOCATION)
              .then((data) => {
                console.log('Coarse location authorization result:', data)
              });
          });
      }
    });
  }
}
