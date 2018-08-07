import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Geoposition } from '@ionic-native/Geolocation'

const FAKE_PATH = [
  {latitude: -34.35136, longitude: -58.76069},
  {latitude: -34.35133, longitude: -58.7607},
  {latitude: -34.35131, longitude: -58.76071},
  {latitude: -34.3513, longitude: -58.76074},
  {latitude: -34.35129, longitude: -58.76077},
  {latitude: -34.35129, longitude: -58.76083},
  {latitude: -34.35125, longitude: -58.76086},
  {latitude: -34.3512, longitude: -58.76093},
  {latitude: -34.35115, longitude: -58.76102},
  {latitude: -34.3511, longitude: -58.76116},
  {latitude: -34.35105, longitude: -58.76133},
  {latitude: -34.35099, longitude: -58.76158},
  {latitude: -34.35095, longitude: -58.76177},
  {latitude: -34.35093, longitude: -58.76193},
  {latitude: -34.35092, longitude: -58.76211},
  {latitude: -34.35093, longitude: -58.76224},
  {latitude: -34.35095, longitude: -58.7624},
  {latitude: -34.35097, longitude: -58.76253},
  {latitude: -34.35101, longitude: -58.76266},
  {latitude: -34.35106, longitude: -58.7628},
  {latitude: -34.35114, longitude: -58.76292},
  {latitude: -34.35106, longitude: -58.76299},
  {latitude: -34.35096, longitude: -58.76305},
  {latitude: -34.35084, longitude: -58.76314},
  {latitude: -34.35069, longitude: -58.76322},
  {latitude: -34.35059, longitude: -58.76326},
  {latitude: -34.35046, longitude: -58.76331},
  {latitude: -34.3504, longitude: -58.76333},
  {latitude: -34.35033, longitude: -58.76335},
  {latitude: -34.35023, longitude: -58.76337},
  {latitude: -34.35011, longitude: -58.76338},
  {latitude: -34.35001, longitude: -58.76338},
  {latitude: -34.34993, longitude: -58.76338},
  {latitude: -34.34985, longitude: -58.76338},
  {latitude: -34.34975, longitude: -58.76337},
  {latitude: -34.34964, longitude: -58.76335},
  {latitude: -34.34953, longitude: -58.76333},
  {latitude: -34.34941, longitude: -58.76329},
  {latitude: -34.34927, longitude: -58.76324},
  {latitude: -34.34918, longitude: -58.76318},
  {latitude: -34.34908, longitude: -58.76312},
  {latitude: -34.34901, longitude: -58.76307},
  {latitude: -34.34901, longitude: -58.76291},
  {latitude: -34.34902, longitude: -58.76275},
  {latitude: -34.34905, longitude: -58.76247},
  {latitude: -34.34909, longitude: -58.7623},
  {latitude: -34.34913, longitude: -58.76214},
  {latitude: -34.3492, longitude: -58.76194},
  {latitude: -34.34929, longitude: -58.76173},
  {latitude: -34.34943, longitude: -58.76145},
  {latitude: -34.34953, longitude: -58.76129},
  {latitude: -34.34959, longitude: -58.76122},
  {latitude: -34.34969, longitude: -58.7611},
  {latitude: -34.34979, longitude: -58.761},
  {latitude: -34.34998, longitude: -58.76084},
  {latitude: -34.35011, longitude: -58.76075},
  {latitude: -34.35021, longitude: -58.76065},
  {latitude: -34.3503, longitude: -58.76054},
  {latitude: -34.35042, longitude: -58.76033},
  {latitude: -34.35047, longitude: -58.76025},
  {latitude: -34.35056, longitude: -58.76013},
  {latitude: -34.35068, longitude: -58.75998},
  {latitude: -34.35079, longitude: -58.75988},
  {latitude: -34.3509, longitude: -58.75977},
  {latitude: -34.35107, longitude: -58.75963},
  {latitude: -34.35112, longitude: -58.75969},
  {latitude: -34.35119, longitude: -58.75971},
  {latitude: -34.35125, longitude: -58.75969},
  {latitude: -34.3513, longitude: -58.75963},
  {latitude: -34.35131, longitude: -58.75955},
  {latitude: -34.3513, longitude: -58.75948},
  {latitude: -34.35125, longitude: -58.75942},
  {latitude: -34.35119, longitude: -58.7594},
  {latitude: -34.35113, longitude: -58.75934},
  {latitude: -34.35109, longitude: -58.75925},
  {latitude: -34.35106, longitude: -58.75909},
  {latitude: -34.35103, longitude: -58.7589},
  {latitude: -34.35103, longitude: -58.75878},
  {latitude: -34.35103, longitude: -58.75864},
  {latitude: -34.35104, longitude: -58.7584},
  {latitude: -34.35105, longitude: -58.75827},
  {latitude: -34.35105, longitude: -58.75815},
  {latitude: -34.35102, longitude: -58.75799},
  {latitude: -34.35098, longitude: -58.75786},
  {latitude: -34.35089, longitude: -58.75764},
  {latitude: -34.35085, longitude: -58.75756},
  {latitude: -34.35082, longitude: -58.75748},
  {latitude: -34.35076, longitude: -58.75736},
  {latitude: -34.35072, longitude: -58.75711},
  {latitude: -34.35067, longitude: -58.75669},
  {latitude: -34.35067, longitude: -58.75661},
  {latitude: -34.35069, longitude: -58.75653},
  {latitude: -34.35071, longitude: -58.75647},
  {latitude: -34.35076, longitude: -58.7564},
  {latitude: -34.35078, longitude: -58.7563},
  {latitude: -34.35084, longitude: -58.75622},
  {latitude: -34.35091, longitude: -58.75615},
  {latitude: -34.35098, longitude: -58.75611},
  {latitude: -34.35111, longitude: -58.75606},
  {latitude: -34.3513, longitude: -58.75601},
  {latitude: -34.35222, longitude: -58.75581},
  {latitude: -34.35239, longitude: -58.75577},
  {latitude: -34.35254, longitude: -58.75573},
  {latitude: -34.35268, longitude: -58.75568},
  {latitude: -34.3528, longitude: -58.75563},
  {latitude: -34.35295, longitude: -58.75556},
  {latitude: -34.35312, longitude: -58.75547},
  {latitude: -34.35327, longitude: -58.75537},
  {latitude: -34.35344, longitude: -58.75524},
  {latitude: -34.35356, longitude: -58.75514},
  {latitude: -34.35365, longitude: -58.75507},
  {latitude: -34.35373, longitude: -58.75502},
  {latitude: -34.35382, longitude: -58.75497},
  {latitude: -34.35392, longitude: -58.75494},
  {latitude: -34.35403, longitude: -58.75493},
  {latitude: -34.35414, longitude: -58.75492},
  {latitude: -34.35425, longitude: -58.75494},
  {latitude: -34.35434, longitude: -58.75496},
  {latitude: -34.35444, longitude: -58.755},
  {latitude: -34.35454, longitude: -58.75506},
  {latitude: -34.35458, longitude: -58.7551},
  {latitude: -34.3546, longitude: -58.75516},
  {latitude: -34.35461, longitude: -58.75522},
  {latitude: -34.35463, longitude: -58.75528},
  {latitude: -34.35466, longitude: -58.75532},
  {latitude: -34.35469, longitude: -58.75535},
  {latitude: -34.35473, longitude: -58.75537},
  {latitude: -34.35476, longitude: -58.75539},
  {latitude: -34.3548, longitude: -58.75539},
  {latitude: -34.35484, longitude: -58.75538},
  {latitude: -34.35488, longitude: -58.75536},
  {latitude: -34.35491, longitude: -58.75533},
  {latitude: -34.35494, longitude: -58.75529},
  {latitude: -34.35496, longitude: -58.75524},
  {latitude: -34.35497, longitude: -58.75519},
  {latitude: -34.35497, longitude: -58.75512},
  {latitude: -34.35494, longitude: -58.75505},
  {latitude: -34.35496, longitude: -58.755},
  {latitude: -34.35499, longitude: -58.75492},
  {latitude: -34.35503, longitude: -58.75485},
  {latitude: -34.35506, longitude: -58.75481},
  {latitude: -34.35511, longitude: -58.75478},
  {latitude: -34.35514, longitude: -58.75477},
  {latitude: -34.35517, longitude: -58.75473},
  {latitude: -34.35519, longitude: -58.75468},
  {latitude: -34.35518, longitude: -58.75465},
  {latitude: -34.35517, longitude: -58.75461},
  {latitude: -34.35514, longitude: -58.75457},
  {latitude: -34.3551, longitude: -58.75454},
  {latitude: -34.35506, longitude: -58.75453},
  {latitude: -34.35501, longitude: -58.75453},
  {latitude: -34.35496, longitude: -58.75452},
  {latitude: -34.3549, longitude: -58.75448},
  {latitude: -34.35488, longitude: -58.75443},
  {latitude: -34.35486, longitude: -58.75438}
];

@Injectable()
export class GeolocationMock {
  constructor() {
  }

  getCurrentPosition() {
    return new Promise((resolve) => {
      resolve({
        coords: FAKE_PATH[0]
      })
    });
  }

  watchPosition() {
    return new Observable<Geoposition>(observer => {
      let index = 0;
      let iterationsUntilStart = 15;
      let onTimeout = () => {
        if (index == 0) {
          iterationsUntilStart--;
        }
        if (iterationsUntilStart == 0 && index < FAKE_PATH.length - 1) {
          index++;
        }
        observer.next({
          coords: {
            latitude: FAKE_PATH[index].latitude,
            longitude: FAKE_PATH[index].longitude,
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0
          },
          timestamp: 0
        });
        setTimeout(onTimeout, 300);
      }
      setTimeout(onTimeout, 300);
    });
  }
}
