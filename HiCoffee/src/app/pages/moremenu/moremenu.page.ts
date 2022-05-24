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
  role: number;
  showSignUpCafe: boolean = true;

  constructor(public loadingUtils: LoadingUtils,
    private router: Router,
    private fetchAPI: FetchAPIService,
    private toastUtils: ToastUtils,
    private localstore: LocalStoreService,
    private alertUtils: AlertUtils,private auth: AuthService) { }

  async ngOnInit() {
    this.info = await this.localstore.loadInfo('info');
    console.log(this.info);
    this.role = this.info.role;
    if(this.role == 1){
      this.showSignUpCafe = false;
    }else{
      this.showSignUpCafe = true;
    }
  }

  // async presentAlertConfirm() {
  //   const alert = await this.alert.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Đăng kí quyền làm chủ quán cà phê',
  //     message: 'Bạn sẽ có quyền đăng quán cà phê với giá 500.000 đồng\n Bạn đồng ý không?',
  //     buttons: [
  //       {
  //         text: 'Hủy',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         id: 'cancel-button',
  //         handler: (blah) => {
  //           console.log('Hủy');
  //         }
  //       }, {
  //         text: 'Đồng ý',
  //         id: 'confirm-button',
  //         handler: () => {
  //           console.log('Đăng ký');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  SignupCafe() {
    this.alertUtils.presentAlertConfirm('Đăng kí quyền làm chủ quán cà phê', 'Bạn sẽ có quyền đăng quán cà phê với giá 500.000 đồng. Bạn đồng ý không?',
      {
        OK: async () => {
          const role={ role: 2};
          const check = await this.signUpOwnerCoffee(role);
          if(check){
            this.toastUtils.presentToastSuccess('Đăng kí chủ quán cà phê thàng công!!!');
            this.info.role = 2;
            this.localstore.saveInfo('info',this.info);
            console.log('Success');
            console.log(this.info);
              
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
          this.router.navigateByUrl('/introduce').then(() => {
            window.location.reload();
          });
        },
        Cancel: () => {
          console.log('Cancel Logout');
        }
      });
  }


  async signUpOwnerCoffee(role: any): Promise<boolean> {
    let check = true;
    await this.fetchAPI.put('customer/information/',role,'role',true).then((res) => {
      console.log(res);
      if (res.status === 200) {
        role = res.data;
        console.log(role);
      } else {
        check = false;
      }
    });
    return check;
  }

  goToSettingPage() {
    this.router.navigateByUrl('/setting-page');
  }
}
