import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Kategorija} from "./kategorije/kategorija";

@Injectable({
  providedIn: 'root'
})
export class KategorijaService {

  kategorijaUrl = "http://localhost:8080/kategorija";

  constructor(private http: HttpClient) {}

  data: any = [];

  getSve():any{
    this.http.get(this.kategorijaUrl).subscribe(value =>
    this.data = value);
    return this.data;
  }

  getKategorije():Observable<Kategorija[]>{
    // @ts-ignore
    return this.http.get(this.kategorijaUrl);
  }



}
