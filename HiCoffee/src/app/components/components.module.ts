import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';

const COMPONENTS = [
    TabsComponent,
]

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,  
  imports: [
    CommonModule
  ] 
})
export class ComponentsModule {}