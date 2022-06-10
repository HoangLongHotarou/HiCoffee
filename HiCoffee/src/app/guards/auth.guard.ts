import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) { }
  async canLoad(): Promise<boolean> {
    if (await this.auth.checkLogin() === true) {
      return true;
    } else {
      this.router.navigateByUrl('/tabs/bound');
      return false;
    }
  }
}
