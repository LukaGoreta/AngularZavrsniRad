import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Oglas} from "../oglas/oglas";
import {Observable} from "rxjs";
import {OglasService} from "../oglas.service";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";

@Injectable()
export class UserOglasiResolver implements Resolve<Oglas[]>{
  constructor(private oglasService: OglasService,private authService:AuthService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Oglas[]> | Promise<Oglas[]> | Oglas[] {
    return this.oglasService.getUserOglasi(this.authService.user.value.id);
  }

}
