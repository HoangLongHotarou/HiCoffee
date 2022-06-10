import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckHobbiesGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) { }
  async canLoad(): Promise<boolean> {
    if (await this.auth.checkLogin() && await this.auth.checkHadHobbies() === false) {
      this.router.navigateByUrl('/topic');
      return false;
    }
    return true;
  }
}
