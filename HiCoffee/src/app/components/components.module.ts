import { MapComponent } from './map/map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card/card.component';
import { MainitemComponent } from './mainitem/mainitem.component';

const COMPONENTS = [
  InputComponent,
  CardComponent,
  MapComponent,
  MainitemComponent
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
