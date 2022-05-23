import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Information } from 'src/app/interfaces/infomation';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import LoadingUtils from 'src/app/utils/loading.utils';

@Component({
  selector: 'app-moremenu',
  templateUrl: './moremenu.page.html',
  styleUrls: ['./moremenu.page.scss'],
})
export class MoremenuPage implements OnInit {

  info : Information;
  showSignUpCafe: boolean = true;

  constructor(public alert: AlertController,public loadingUtils: LoadingUtils,private fetchAPI: FetchAPIService,) { }

  ngOnInit() {
    this.loadingUtils.presentLoading('Vui lòng chờ');
    this.getApiUser();
  }

  getApiUser(){
    this.fetchAPI.get(`customer/information/me/`,true).then((res) => {
      this.info = res.data;
      this.loadingUtils.dismiss();
      console.log(this.info.role);
      if(this.info.role == 1){
        this.showSignUpCafe = false;
      }else{
        this.showSignUpCafe = true;
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Đăng kí quyền làm chủ quán cà phê',
      message: 'Bạn sẽ có quyền đăng quán cà phê với giá 500.000 đồng\n Bạn đồng ý không?',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Hủy');
          }
        }, {
          text: 'Đồng ý',
          id: 'confirm-button',
          handler: () => {
            console.log('Đăng ký');
          }
        }
      ]
    });

    await alert.present();
  }

  SignupCafe() {
    this.presentAlertConfirm();
  }

  Logout() {
    
  }
}
