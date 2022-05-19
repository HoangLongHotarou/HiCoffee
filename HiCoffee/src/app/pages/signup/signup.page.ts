import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  loading: any;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmpassword: string;

  showTipPassword = false;

  constructor(public toastController: ToastController, private auth: AuthService, private router: Router, public loadingController: LoadingController) { }

  async presentSpace() {
    const toast = await this.toastController.create({
      message: 'Các ô không được để trống!',
      duration: 2000
    });
    toast.present();
  }
  async presentSucess() {
    const toast = await this.toastController.create({
      message: 'Đăng kí thành công!',
      duration: 2000
    });
    toast.present();
  }
  async presentErrorPassword() {
    const toast = await this.toastController.create({
      message: 'Mật khẩu phải giống nhau!',
      duration: 2000
    });
    toast.present();
  }

  async presentError() {
    const toast = await this.toastController.create({
      message: 'Lỗi đăng ký!',
      duration: 2000
    });
    toast.present();
  }

  async clickSignup() {
    //console.log(this.firstname);
    if (this.email == undefined || this.firstname == undefined || this.lastname == undefined ||
      this.username == undefined || this.password == undefined || this.confirmpassword == undefined) {
      this.presentSpace();
    } else {
      if (this.password != this.confirmpassword) {
        this.presentErrorPassword();
      }
      else {
        const user = {
          username: this.username,
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          password: this.password
        };
        let check = await this.auth.signUp(user);
        console.log(check);
        if (check == true) {
          this.presentSucess();
          this.router.navigateByUrl('/login');
        } else {
          this.presentError();
        }
      }
    }
  }
  ngOnInit() {

  }

  onChange() {
    this.showTipPassword = true;
  }
}
