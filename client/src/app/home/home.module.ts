import {
  NgModule,
} from '@angular/core';
import {
  CommonModule,
} from '@angular/common';
import {
  HomeRoutingModule,
} from './home-routing.module';
import {
  HomeComponent,
} from './home.component';
import {
  AgmCoreModule,
} from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule { }
