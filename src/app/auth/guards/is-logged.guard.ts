import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
  export class IsLoggedGuard implements CanActivate {

    constructor (private authService:AuthService,
                private router:Router) {}

    canActivate(): Observable<boolean| UrlTree> {
        return this.authService.checkLogin().pipe(
          map ((isLogged) => isLogged || this.router.createUrlTree(['/login']))
        );
    }
  }
