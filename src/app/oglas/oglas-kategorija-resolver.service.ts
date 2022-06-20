import {ActivatedRouteSnapshot, Data, Resolve, RouterStateSnapshot} from "@angular/router";
import {Oglas} from "../oglas/oglas";
import {elementAt, Observable} from "rxjs";
import {OglasService} from "../oglas.service";
import {Injectable} from "@angular/core";
import {KategorijaService} from "../kategorija.service";
import {Kategorija} from "../kategorije/kategorija";

@Injectable()
export class OglasKategorijaResolver implements Resolve<Oglas[]>{
  constructor(private oglasService: OglasService, private kategorijaService: KategorijaService) {}

  kategorija : Kategorija[] = [];
  data: any;
  idKategorija : number;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Oglas[]> | Promise<Oglas[]> | Oglas[] {

     this.data = this.kategorijaService.getSve();
     this.kategorija = this.data;

    this.kategorija.forEach(element => {
       if(element.nazivKategorije == route.params['nazivKategorije']){
         this.idKategorija = element.idKategorije;
       }
     })

    // if(this.idKategorija == null){
      // this.idKategorija = 1;
    // }

    return this.oglasService.getOglasByKategory(this.idKategorija);
  }

}
