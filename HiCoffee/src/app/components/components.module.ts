import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { MapComponent } from './map/map.component';

const COMPONENTS = [
    TabsComponent,
    MapComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
    imports: [
    CommonModule,
  ]
})
export class ComponentsModule {}
