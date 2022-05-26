import { LocalStoreService } from './../../services/localstore.service';
import { FetchAPIService } from './../../services/fetch-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Information } from 'src/app/interfaces/infomation';
import LoadingUtils from 'src/app/utils/loading.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  info: Information;

  constructor(
    public toastController: ToastController,
    private auth: AuthService,
    private fetchAPI: FetchAPIService,
    private router: Router,
    private localstore: LocalStoreService,
    private loadingUtils: LoadingUtils,
  ) { }


  async presentErrorLogin() {
    const toast = await this.toastController.create({
      message: 'Tên tài khoản hoặc mật khẩu sai!',
      duration: 2000
    });
    toast.present();
  }

  async presentSpace() {
    const toast = await this.toastController.create({
      message: 'Các ô không được để trống!',
      duration: 2000
    });
    toast.present();
  }

  async clickLogin() {
    if (this.username === undefined && this.password === undefined) {
      this.presentSpace();
    } else {
      this.loadingUtils.presentLoading('Đang đăng nhập');
      const user = {
        username: this.username,
        password: this.password
      };
      const check = await this.auth.login(user);
      if (check) {
        this.fetchAPI.get(`customer/information/me/`, true).then((res) => {
          this.info = res.data;
          this.localstore.saveInfo('info', this.info);
          this.loadingUtils.dismiss();
          this.router.navigate(['/tabs']).then(()=>{
            window.location.reload();
          });
        });
      } else {
        this.presentErrorLogin();
        this.loadingUtils.dismiss();
      }
    }
  }

  ngOnInit() {
  }
}
