import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/interfaces/auth.interface/user';
import { Information } from 'src/app/interfaces/infomation';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
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

  showSignUpCafe: boolean = true;

  isLogin: boolean = true;

  constructor(public loadingController: LoadingController,
    private router: Router,
    public loadingUtils: LoadingUtils,
    private fetchAPI: FetchAPIService,) {

  }

  ngOnInit() {
    this.loadingUtils.presentLoading('Vui lòng chờ');
    this.getApiUser();
  }

  getApiUser() {
    this.fetchAPI.get(`customer/information/me/`, true).then((res) => {
      this.info = res.data;
      this.user = this.info.user;
      this.email = this.user.email;
      this.lastName = this.user.last_name;
      this.firstName = this.user.first_name;
      this.loadingUtils.dismiss();
      console.log(this.info.role);
      if (this.info.role == 1) {
        this.showSignUpCafe = true;
      } else {
        this.showSignUpCafe = false;
      }
    });
  }

  SignUpCoffee() {
    this.router.navigateByUrl('/signupcoffee');
  }
}
