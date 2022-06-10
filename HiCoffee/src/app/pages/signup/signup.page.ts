import LoadingUtils from 'src/app/utils/loading.utils';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import ToastUtils from 'src/app/utils/toast.utils';

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

  constructor(
    private toastUtils: ToastUtils,
    private loadingUtils: LoadingUtils,
    private auth: AuthService,
    private router: Router) { }

  async clickSignup() {
    //console.log(this.firstname);
    this.loadingUtils.presentLoading('Vui lòng chờ');
    if (this.email === undefined || this.firstname === undefined || this.lastname === undefined ||
      this.username === undefined || this.password === undefined || this.confirmpassword === undefined) {
      this.toastUtils.presentToastError('Các ô không được để trống!');
    } else {
      if (this.password !== this.confirmpassword) {
        this.toastUtils.presentToastError('Mật khẩu phải giống nhau!');
      }
      else {
        const user = {
          username: this.username,
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          password: this.password
        };
        const check = await this.auth.signUp(user);
        console.log(check);
        if (check[1] === true) {
          this.toastUtils.presentToastSuccess('Đăng kí thành công!');
          this.router.navigateByUrl('/login');
        } else {
          this.toastUtils.presentToastError(check[0]);
        }
      }
    }
    this.loadingUtils.dismiss();
  }
  ngOnInit() {

  }

  onChange() {
    this.showTipPassword = true;
  }
}
