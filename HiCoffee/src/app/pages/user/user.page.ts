import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  loading: any;

  isLogin: boolean;
  imgSrc: string;
  email: string;
  lastName: string;
  firstName: string;

  constructor(public loadingController: LoadingController) { 
    this.imgSrc = '../../../assets/images/avatarDefault.jpg'
    this.email = '1911158@dlu.edu.vn';
    this.lastName = 'Nguyen';
    this.firstName = 'Hoang Dang Khoa'
    this.isLogin = true;    

    setTimeout(() => {
      this.loading.dismiss();
    }, 2000)
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-style',
      message: 'Vui lòng chờ',
    });
    return this.loading.present();
  }

  ngOnInit() {
    if (this.isLogin) {
      this.presentLoading();
    }
  }

}
