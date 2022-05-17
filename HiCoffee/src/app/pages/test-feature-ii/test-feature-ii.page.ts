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
    username: 'dazai123',
    first_name: 'Hotarou',
    last_name: 'Dazai',
    email: 'dazai@domain.com',
    password: 'test12345'
    };
    await this.auth.signUp(user);
  }

  async btnLogin() {
    const user = {
    username: 'dazai123',
    password: 'test12345'
    };
    await this.auth.login(user);
  }

  async btnLogout() {
    await this.auth.logout();
  }
}
