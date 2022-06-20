import {Component, OnDestroy, OnInit} from '@angular/core';
import { Kategorija} from "./kategorija";
import { KATEGORIJE} from "./mock-kategorije";
import {ActivatedRoute, Data, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {KategorijaService} from "../kategorija.service";

@Component({
  selector: 'app-kategorije',
  templateUrl: './kategorije.component.html',
  styleUrls: ['./kategorije.component.css']
})
export class KategorijeComponent implements OnInit, OnDestroy{
  // kategorije = KATEGORIJE;
  sveKategorije: Kategorija[] = [];
  naziv: string;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute,private kategorijaService: KategorijaService) {
    this.paramsSubscription = this.route.params.subscribe();
  }

  ngOnInit(){

    // this.sveKategorije = this.kategorijaService.getKategorije();

    this.route.data.subscribe(
      (data:Data)=>{
        this.sveKategorije = data['kategorije']
      }
    )

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) =>{
        this.naziv = params["nazivKategorije"];
      }
    );
  }

  getSize() {
    return this.sveKategorije.length;
  }


  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
