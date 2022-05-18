import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-moremenu',
  templateUrl: './moremenu.page.html',
  styleUrls: ['./moremenu.page.scss'],
})
export class MoremenuPage implements OnInit {

  constructor(public alert: AlertController) { }

  ngOnInit() {
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

  SignupCafe(){
    this.presentAlertConfirm();
  }
}
