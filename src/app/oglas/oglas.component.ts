import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {OGLASI} from "./mock-oglasi";
import {ActivatedRoute, Data, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {KATEGORIJE} from "../kategorije/mock-kategorije";
import {Kategorija} from "../kategorije/kategorija";
import {Oglas} from "./oglas";
import {OglasService} from "../oglas.service";
import {KategorijaService} from "../kategorija.service";

@Component({
  selector: 'app-oglas',
  templateUrl: './oglas.component.html',
  styleUrls: ['./oglas.component.css']
})
export class OglasComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;

  kategorije: Kategorija[] = []; //sve kategorije
  sviOglasi: Oglas[] = [];

  nazivKategorije: string; // ovo je naziv koji saljemo u htmlu



  constructor(private route: ActivatedRoute, private oglasService: OglasService,private kategorijaService: KategorijaService) {
    this.nazivKategorije = this.route.snapshot.params["oglas"];
  }

  ngOnInit(){
    this.route.data.subscribe(
      (data: Data) => {
        this.sviOglasi = data['oglasKategorije'];

        this.sviOglasi.forEach((element)=>{
          this.oglasService.getOglasImage(element.oglasId).subscribe(data => {
            let reader = new FileReader();
            reader.addEventListener("load", () =>{
              element.imagePath = reader.result;
            }, false);
            if(data){
              reader.readAsDataURL(data);
            }
          })
        });

      }
    );




    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) =>{
        this.nazivKategorije = params["nazivKategorije"];

        // this.sviOglasi.forEach((element)=>{
        //   this.oglasService.getOglasImage(element.oglasId).subscribe(data => {
        //     let reader = new FileReader();
        //     reader.addEventListener("load", () =>{
        //       element.imagePath = reader.result;
        //     }, false);
        //     if(data){
        //       reader.readAsDataURL(data);
        //     }
        //   })
        // });
      }
    );
  };


  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
