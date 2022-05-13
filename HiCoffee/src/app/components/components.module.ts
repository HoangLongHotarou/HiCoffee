import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { InputComponent } from './input/input.component';
import { IonicModule } from '@ionic/angular';

const COMPONENTS = [
    TabsComponent,
    InputComponent
]

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,  
  imports: [
    CommonModule,IonicModule
  ] 
})
export class ComponentsModule {}