import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Diagnostic } from '@ionic-native/diagnostic';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { ProvidersModule } from '../providers/providers.module';
import { PipesModule } from '../pipes/pipes.module';
import { PagesModule } from '../pages/pages.module';
import { MapProvider } from '../providers/map/map';

export const firebaseConfig = {
  apiKey: "AIzaSyBmd7oWUcErKHPSSG4WRShfK7WvYjLo5Wo",
  authDomain: "mapa-san-matias.firebaseapp.com",
  databaseURL: "https://mapa-san-matias.firebaseio.com",
  projectId: "mapa-san-matias",
  storageBucket: "mapa-san-matias.appspot.com",
  messagingSenderId: "781656691682"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    PagesModule,
    ComponentsModule,
    ProvidersModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Diagnostic,
    MapProvider
  ]
})
export class AppModule {}
