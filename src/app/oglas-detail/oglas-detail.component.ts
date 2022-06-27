import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {empty, Subscription} from "rxjs";
import {Oglas} from "../oglas/oglas";
import {OglasService} from "../oglas.service";

@Component({
  selector: 'app-oglas-detail',
  templateUrl: './oglas-detail.component.html',
  styleUrls: ['./oglas-detail.component.css']
})
export class OglasDetailComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  odabraniOglas : Oglas;
  oglasId: number;

  constructor(private route: ActivatedRoute, private oglasService: OglasService) {
    this.paramsSubscription = this.route.params.subscribe();
  }

  ngOnInit(){
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) =>{
        this.oglasId = +params["oglasId"];

        if(this.odabraniOglas == null){
          this.oglasService.getOglasById(this.oglasId).subscribe(
            value => {
              this.odabraniOglas = value;
            }
          );
        }
        this.getImageFromService(this.oglasId);
      }
    );



  };

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  tmpSlikaOglasa: any;
  getImageFromService(idOglasa: number){
    this.oglasService.getOglasImage(idOglasa)
      .subscribe(data => {
        this.createImageFromBlob(data);
    })
  }

  createImageFromBlob(image: Blob){
    let reader = new FileReader();

    if(image){
      reader.readAsDataURL(image);
    }

    reader.addEventListener("load", () =>{
      this.tmpSlikaOglasa = reader.result;
    });
  }




}
