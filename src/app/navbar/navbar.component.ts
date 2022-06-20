import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";
import {User} from "../user/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , OnDestroy{
  isLoggedIn = false;
  private userSub : Subscription;
  user:User;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.userSub =  this.authService.user.subscribe(
      user => {
        this.isLoggedIn = !!user;
        console.log(this.isLoggedIn);
      }
    );
    // this.userSub = this.authService.user.subscribe(user => this.user = user);
  }

  logoutUser(){
    this.authService.logoutUser();
    this.router.navigate(["/pocetna"]);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }



}
