import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // tslint:disable-next-line:max-line-length
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (sessionStorage.getItem('currentUser')) {
        console.log(sessionStorage.getItem('currentUser'));
        return true;
      } else {
        console.log('problem');
      }
      alert('You are not logged in ;)');
      this.router.navigate(['/']);
      return false;
  }

}
