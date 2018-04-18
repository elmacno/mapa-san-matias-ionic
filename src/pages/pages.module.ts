import { NgModule } from '@angular/core';
import { HomePageModule } from './home/home.module';
import { MapPageModule } from './map/map.module';

@NgModule({
  imports: [
    HomePageModule,
    MapPageModule
  ],
})
export class PagesModule {}
