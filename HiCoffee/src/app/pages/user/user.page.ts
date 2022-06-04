import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Information } from 'src/app/interfaces/infomation';
import { CoffeeShopService } from 'src/app/services/coffee-shop/coffee-shop.service';
import { LocalStoreService } from 'src/app/services/localstore.service';
import LoadingUtils from 'src/app/utils/loading.utils';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  loading: any;

  info: Information;

  user: any;

  email: string;
  lastName: string;
  firstName: string;
  imgSrc: string;
  role: number;

  showSignUpCafe = true;

  isLogin = true;

  coffeeShop$: CoffeeShop[]=[];

  constructor(public loadingController: LoadingController,
    private router: Router,
    private loadingUtils: LoadingUtils,
    private fetchCoffeeShop: CoffeeShopService,
    private localstore: LocalStoreService) {

  }

  async ngOnInit() {
    this.info = await this.localstore.loadInfo('info');
    console.log(this.info);
    this.user = this.info.user;
    this.email = this.user.email;
    this.lastName = this.user.last_name;
    this.firstName = this.user.first_name;
    this.role= this.info.role;
    if(this.role === 1){
      this.showSignUpCafe = true;
    }else{
      this.showSignUpCafe = false;
      await this.loadingUtils.presentLoading('Đang lấy dữ liệu từ API</br>Vui lòng chờ');
      await this.fetchCoffeeShop.getCoffeebyUser().then((res) => {
        this.coffeeShop$ = res.coffeeShops;
      });
      this.loadingUtils.dismiss();
      console.log(this.coffeeShop$);
    }
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignUpCoffee() {
    this.router.navigateByUrl('/signupcoffee');
  }
}
