import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  registiran = false;
  error: string;
  success: string;


  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }


  submitForm(form: NgForm){
    console.log(form.value);

    this.authService.signup(form.value.email,form.value.password).subscribe(
      response => {
        console.log(response);
        this.success = "Uspješna registracija";

        this.registiran = !this.registiran;

        this.router.navigate(["/login"]);

        }, error => {
        this.error = error;
      }
    );
    form.resetForm();
  }

}
