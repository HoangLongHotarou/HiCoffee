import { MapComponent } from '../../components/map/map.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from '../../components/card/card.component';
import { InputpasswordComponent } from '../../components/inputpassword/inputpassword.component';
import { SlidecategoryComponent } from '../../components/slidecategory/slidecategory.component';
import { MainitemComponent } from 'src/app/components/mainitem/mainitem.component';
import { SearchbarComponent } from 'src/app/components/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { ItemFilterComponent } from 'src/app/components/item-filter/item-filter.component';

const COMPONENTS = [
  InputComponent,
  CardComponent,
  MapComponent,
  InputpasswordComponent,
  SlidecategoryComponent,
  MainitemComponent,
  SearchbarComponent,
  FeedbackComponent,
  ItemFilterComponent,
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,]
})
export class ComponentsModule { }
