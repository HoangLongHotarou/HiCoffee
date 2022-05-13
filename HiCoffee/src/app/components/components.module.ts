import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card/card.component';

const COMPONENTS = [
    InputComponent,
    CardComponent
]

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,  
  imports: [
    CommonModule,
    IonicModule
  ] 
})
export class ComponentsModule {}