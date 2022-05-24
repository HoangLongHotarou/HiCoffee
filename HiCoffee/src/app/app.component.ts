import { Component, OnInit, Renderer2 } from '@angular/core';
import { LocalStoreService } from './services/localstore.service';
import AlertUtils from './utils/alert.utils';
import LoadingUtils from './utils/loading.utils';
import ToastUtils from './utils/toast.utils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [LoadingUtils, ToastUtils, AlertUtils],
})
export class AppComponent implements OnInit {
  constructor(private localstore: LocalStoreService,private render : Renderer2) {
  }

  check: boolean;

  async ngOnInit(){
    this.check = await this.localstore.loadMode('mode');
    console.log(this.check);
    
    if(this.check){
      this.render.setAttribute(document.body,'color-theme','dark');
    }else{
      this.render.setAttribute(document.body,'color-theme','light');
    }
  }  
}
