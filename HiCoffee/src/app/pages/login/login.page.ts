import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(public toastController: ToastController, private auth: AuthService, private router: Router) { }

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
    if (this.username == undefined && this.password == undefined) {
      this.presentSpace();
    } else {
      const user = {
        username: this.username,
        password: this.password
      };
      let check = await this.auth.login(user);
      if (check) {
        this.router.navigateByUrl('/tabs');
      }else{
        this.presentErrorLogin();
      }
    }
  }

  ngOnInit() {
  }


}
