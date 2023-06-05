import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService:AuthService,
    private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const allowedRoles = route.data?.['allowedRoles'];
    const user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
    if (!user){
      return of(this.router.createUrlTree(['/login/']));
    }
    if (allowedRoles.includes(user.role.type)){
        return of(true);
    }
    else {
        if (user.role.type === 'Librarian') return of(this.router.createUrlTree(['/gestion-recursos/']));
        if (user.role.type === 'Admin') return of(this.router.createUrlTree(['/gestion-usuarios/']));
        if (user.role.type === 'User') return of(this.router.createUrlTree(['/usuarios-biblioteca/']));
        return of(false);
    }
  }
}
