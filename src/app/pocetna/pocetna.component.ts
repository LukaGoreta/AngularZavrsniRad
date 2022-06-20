import {Component, OnDestroy, OnInit} from '@angular/core';
import {KATEGORIJE} from "../kategorije/mock-kategorije";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit , OnDestroy{
  kategorije = KATEGORIJE;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
    this.paramsSubscription = this.route.params.subscribe();
  }

  ngOnInit(): void {
    // this.paramsSubscription = this.route.params.subscribe(
    //   (params: Params) =>{
    //     // this.oglasId = +params["oglasId"];
    //   }
    // );

  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
