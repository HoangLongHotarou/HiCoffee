/* eslint-disable @typescript-eslint/naming-convention */
import { UserCreate } from '../../interfaces/auth.interface/usercreate';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-feature-ii',
  templateUrl: './test-feature-ii.page.html',
  styleUrls: ['./test-feature-ii.page.scss'],
})
export class TestFeatureIiPage implements OnInit {

  userCreate: UserCreate;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  async btnSignUp() {
    const user = {
      username: 'dazai124',
      first_name: 'Hotarou',
      last_name: 'Dazai',
      email: 'dazai1@domain.com',
      password: 'test12345'
    };
    console.log(await this.auth.signUp(user));
  }

  async btnLogin() {
    const user = {
      username: 'user1',
      password: 'User12345'
      // username: 'admin',
      // password: '1'
      // username: 'longhoangdazai',
      // password: 'Dazai12345'
    };
    await this.auth.login(user);
  }

  async btnLogout() {
    await this.auth.logout();
  }
}
