import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpResponse} from "@angular/common/http";

import {Oglas} from "./oglas/oglas";
import {OglasResolver} from "./svi-oglasi/svi-oglasi-resolver.service";

@Injectable({
  providedIn: 'root'
})
export class OglasService {

  oglasUrl = "http://localhost:8080/oglas";
  oglasKategorijaUrl = "http://localhost:8080/oglas/kategorija/";
  userOglasiUrl = "http://localhost:8080/oglas/user/";
  brisanjeOglasaUrl = "http://localhost:8080/oglas/obrisi/"; //+idOglasa

  constructor(private http: HttpClient) {}

  data : any = [];
  oglas: Object;

  getOglasi():any{
    this.http.get(this.oglasUrl).subscribe((oglasData)=> {
      this.data = oglasData;
    })
    return this.data;
  }

  getOglasRes():Observable<Oglas[]>{
    // @ts-ignore
    return this.http.get(this.oglasUrl);
  }

  getOglasByKategory(oglasId : number):Observable<Oglas[]>{
    // @ts-ignore
    return this.http.get(this.oglasKategorijaUrl+oglasId);
  }

  getOglasImage(oglasId : number): Observable<Blob>{
     const imageUrl = this.oglasUrl+"/slika/"+oglasId;
    return this.http.get(imageUrl, {responseType: 'blob'})
  }

  getUserOglasi(user_token: string):Observable<Oglas[]>{
    // @ts-ignore
    return this.http.get(this.userOglasiUrl+user_token);
  }

  getOglasById(oglasId: number): Observable<Oglas>{
    return this.http.get<Oglas>(this.oglasUrl+"/"+oglasId).pipe();
  }


  deleteOglas(oglasId: number):Observable<Oglas>{
    // @ts-ignore
    return this.http.delete(this.brisanjeOglasaUrl+oglasId,new HttpHeaders({'Content-Type': 'application/json'}));
  }






}
