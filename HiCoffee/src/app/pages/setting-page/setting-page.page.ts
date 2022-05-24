import { Component, OnInit, Renderer2 } from '@angular/core';
import { LocalStoreService } from 'src/app/services/localstore.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.page.html',
  styleUrls: ['./setting-page.page.scss'],
})
export class SettingPagePage implements OnInit {
  
  check : boolean;
  
  constructor(private render: Renderer2,private localstore: LocalStoreService) { }

  async ngOnInit() {
    this.check = await this.localstore.loadMode('mode');
    console.log("check : "+this.check);
  }

  onToggleColorTheme(event){
    console.log(event.detail.checked);
    if(event.detail.checked){
      //document.body.setAttribute('color-theme','dark');
      this.render.setAttribute(document.body,'color-theme','dark');
      this.localstore.saveMode('mode',true);
    }else{
      //document.body.setAttribute('color-theme','light');
      this.render.setAttribute(document.body,'color-theme','light');
      this.localstore.saveMode('mode',false);
    }
  }

}
