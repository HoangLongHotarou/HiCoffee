import { MapComponent } from './map/map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card/card.component';

const COMPONENTS = [
  InputComponent,
  CardComponent,
  MapComponent,
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
