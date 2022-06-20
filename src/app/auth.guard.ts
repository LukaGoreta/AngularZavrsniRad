import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {map, Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";



@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService,private router:Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(map(user => {
      return !!user;
    }),tap(isAuth =>{
      if(!isAuth){
        this.router.navigate(['/pocetna']);
      }
    }));
  }

}
