import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  /*
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  // WORKING CODE

    if (this.authService.isAuthenticated()) { return true; }
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
  */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (await this.authService.getIsLoggedIn()) {
      return true;
    }

    // this.localStorageService.setItem(AuthGuardService.returnUrl, state.url);
    this.authService.startSignIn();

    return false;
  }

}
