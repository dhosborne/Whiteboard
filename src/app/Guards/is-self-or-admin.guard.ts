import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IsSelfOrAdminGuard implements CanActivate {
  authorized: boolean;

  constructor(
    private auth: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.auth.currentUser.subscribe(user => {
      const routeId = next.params.id;

      if ((routeId === user._id) || user.role === 'Admin') {
        this.authorized = true;
      } else {
        console.log('Nah fam.. aint authorized');
        this.authorized = false;
      }
    });

    return this.authorized;
  }
}
