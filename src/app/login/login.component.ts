import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  success: string;

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  submitForm(form: NgForm){
      console.log(form.value);


    this.authService.signin(form.value.email,form.value.password).subscribe(
        response => {
          this.success = "Uspješno ste se ulogirali!";

          this.router.navigate(["/pocetna"]);

          console.log(response);
        }, error => {
          console.log(error);
          this.error = error;
        }
      );
      form.resetForm();



  }

}
