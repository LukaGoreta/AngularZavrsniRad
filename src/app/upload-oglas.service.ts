import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadOglasService {

  url = "http://localhost:8080/oglas";

  constructor(private http:HttpClient) { }

  upload(formData: FormData){
    this.http
      .post(this.url, formData)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }

}
