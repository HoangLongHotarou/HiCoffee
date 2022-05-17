import { MapComponent } from '../../components/map/map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from '../../components/card/card.component';
import { InputpasswordComponent } from '../../components/inputpassword/inputpassword.component';
import { SlidecategoryComponent } from '../../components/slidecategory/slidecategory.component';
import { MainitemComponent } from 'src/app/components/mainitem/mainitem.component';

const COMPONENTS = [
  InputComponent,
  CardComponent,
  MapComponent,
  InputpasswordComponent,
  SlidecategoryComponent,
  MainitemComponent,
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
