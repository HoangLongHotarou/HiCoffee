import { InformationService } from './../../services/information/information.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Information } from 'src/app/interfaces/infomation';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { LocalStoreService } from 'src/app/services/localstore.service';
import AlertUtils from 'src/app/utils/alert.utils';
import LoadingUtils from 'src/app/utils/loading.utils';
import ToastUtils from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-moremenu',
  templateUrl: './moremenu.page.html',
  styleUrls: ['./moremenu.page.scss'],
})
export class MoremenuPage implements OnInit {

  info: Information;
  checkLogin: boolean = true;
  role: number;
  showSignUpCafe = true;

  constructor(public loadingUtils: LoadingUtils,
    private router: Router,
    private toastUtils: ToastUtils,
    private localstore: LocalStoreService,
    private alertUtils: AlertUtils,
    private auth: AuthService,
    private infoService: InformationService
    ) { }

  async ngOnInit() {
    this.info = await this.localstore.loadInfo('info');
    if(this.info == undefined){
      return;
    }
    this.role = this.info.role;
    if(this.role === 1){
      this.showSignUpCafe = false;
    }else{
      this.showSignUpCafe = true;
    }
    if((await this.auth.checkLogin()).valueOf()){
      this.checkLogin = false;
    }
  }

  SignupCafe() {
    this.alertUtils.presentAlertConfirm(
      'Đăng kí quyền làm chủ quán cà phê',
      'Bạn sẽ có quyền đăng quán cà phê với giá 500.000 đồng. Bạn đồng ý không?',
      {
        OK: async () => {
          const role={ role: 2};
          const check = await this.infoService.signUpOwnerCoffee(role);
          if(check){
            this.toastUtils.presentToastSuccess('Đăng kí chủ quán cà phê thàng công!!!');
            this.info.role = 2;
            this.localstore.saveInfo('info',this.info);
            console.log('Success');
            console.log(this.info);
            this.router.navigateByUrl('/tabs/moremenu').then(() => {
              window.location.reload();
            });
          }else{
            this.toastUtils.presentToastError('Lỗi đăng ký');
            console.log('Error');
          }
        },
        Cancel: () => {
          console.log('Cancel SignupOwnerCoffee');
        }
      });
  }

  async Logout() {
    await this.alertUtils.presentAlertConfirm('Xác nhận', 'Bạn có muốn đăng xuất không?',
      {
        OK: async () => {
          await this.auth.logout();
          this.router.navigateByUrl('/introduce');
          // this.router.navigateByUrl('/introduce').then(() => {
          //   window.location.reload();
          // });
        },
        Cancel: () => {
          console.log('Cancel Logout');
        }
      });
  }



  goToSettingPage() {
    this.router.navigateByUrl('/setting-page');
  }

  goToInformationPage() {
    this.router.navigateByUrl('/information');
  }
}
