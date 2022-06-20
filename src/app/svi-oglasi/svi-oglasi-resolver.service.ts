import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Oglas} from "../oglas/oglas";
import {Observable} from "rxjs";
import {OglasService} from "../oglas.service";
import {Injectable} from "@angular/core";

@Injectable()
export class OglasResolver implements Resolve<Oglas[]>{
  constructor(private oglasService: OglasService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Oglas[]> | Promise<Oglas[]> | Oglas[] {
    return this.oglasService.getOglasRes();
  }

}
