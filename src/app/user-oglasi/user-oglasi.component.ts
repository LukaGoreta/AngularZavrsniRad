import {Component, OnDestroy, OnInit} from '@angular/core';
import {OglasService} from "../oglas.service";
import {Oglas} from "../oglas/oglas";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Data, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-oglasi',
  templateUrl: './user-oglasi.component.html',
  styleUrls: ['./user-oglasi.component.css']
})
export class UserOglasiComponent implements OnInit, OnDestroy{
  paramsSubscription : Subscription;

  oglasiUsera : Oglas[] = [];

  constructor(private oglasService:OglasService,private authService:AuthService,private route: ActivatedRoute,
              private router: Router) {
    this.paramsSubscription = this.route.params.subscribe();
  }

  ngOnInit(){
    this.route.data.subscribe(
      (data: Data) => {
        this.oglasiUsera = data['userOglasi'];
      }
    );

    this.oglasiUsera.forEach((element)=>{
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

  deleteOglas(oglasId: number){
    console.log(oglasId);
    this.oglasService.deleteOglas(oglasId).subscribe();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/mojiOglasi']);
    });


    // this.router.navigate(["/mojiOglasi"]);
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.oglasiUsera = null;
  }





}
