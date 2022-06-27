import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {OglasService} from "../oglas.service";
import {Oglas} from "../oglas/oglas";

@Component({
  selector: 'app-svi-oglasi',
  templateUrl: './svi-oglasi.component.html',
  styleUrls: ['./svi-oglasi.component.css']
})
export class SviOglasiComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  private oglasId: number;
  sviOglasi: Oglas[] = [];

  constructor(private route: ActivatedRoute,private oglasService: OglasService) {
    this.paramsSubscription = this.route.params.subscribe();
  }

  ngOnInit(){

    // this.oglasService.getOglasi().subscribe(( data:{oglas:Oglas[]}) => {
    //   this.sviOglasi = data.oglas;
    // });

    this.route.data.subscribe(
      (data: Data) => {
        this.sviOglasi = data['oglasi'];
      }
    );

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

    // this.paramsSubscription = this.route.params.subscribe(
    //   (params: Params) =>{
    //     this.oglasId = +params["oglasId"];
    //   }
    // );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  //   tmpSlikaOglasa: any;
  //   createImageFromBlob(image: Blob){
  //
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () =>{
  //     this.tmpSlikaOglasa = reader.result;
  //   }, false);
  //
  //   if(image){
  //     reader.readAsDataURL(image);
  //   }
  // }
  //
  // getImageFromService(num: number){
  //   this.oglasService.getOglasImage(num).subscribe(data => {
  //     this.createImageFromBlob(data);
  //   })
  // }


}
