import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './modules/component/component.module';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(),
    AppRoutingModule, ComponentsModule, RouterModule,FormsModule, HttpClientModule],
  providers: [{ 
      provide: RouteReuseStrategy, useClass: IonicRouteStrategy 
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
