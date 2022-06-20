import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Kategorija} from "./kategorija";
import {Observable} from "rxjs";
import {KategorijaService} from "../kategorija.service";
import {Injectable} from "@angular/core";

@Injectable()
export class KategorijaResolver implements Resolve<Kategorija[]>{
  constructor(private kategorijaService: KategorijaService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Kategorija[]> | Promise<Kategorija[]> | Kategorija[] {
    return this.kategorijaService.getKategorije();
  }

}
