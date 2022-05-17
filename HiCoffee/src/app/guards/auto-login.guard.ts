import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) { }
  async canLoad(): Promise<boolean> {
    if (await this.auth.checkLogin() === true) {
      this.router.navigateByUrl('/tabs');
      return true;
    } else {
      return true;
    }
  }
}
