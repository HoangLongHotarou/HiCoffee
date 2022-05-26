import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Information } from 'src/app/interfaces/infomation';
import { LocalStoreService } from 'src/app/services/localstore.service';

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

  showSignUpCafe: boolean = true;

  isLogin: boolean = true;

  constructor(public loadingController: LoadingController,
    private router: Router,
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
    if(this.role == 1){
      this.showSignUpCafe = true;
    }else{
      this.showSignUpCafe = false;
    }
  }
  SignUpCoffee() {
    this.router.navigateByUrl('/signupcoffee');
  }
}
