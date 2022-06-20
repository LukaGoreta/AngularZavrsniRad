import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {KategorijaService} from "../kategorija.service";
import {Kategorija} from "../kategorije/kategorija";
import {ActivatedRoute, Data} from "@angular/router";
import {UploadOglasService} from "../upload-oglas.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-unos-oglasa',
  templateUrl: './unos-oglasa.component.html',
  styleUrls: ['./unos-oglasa.component.css']
})
export class UnosOglasaComponent implements OnInit, OnDestroy {
// @ViewChild('f') forma: NgForm; //alternativa za postanje forme

  public message: string;
  userFile: File ;
  imgURL:any;
  public imagePath: any;
  kategorijaId: number;
  // file: File = null;

  paramsSubscription: Subscription;
  sveKategorije: Kategorija[] = [];


  constructor(private route: ActivatedRoute,private kategorijeService: KategorijaService
  ,private uploadOglasService: UploadOglasService, private http: HttpClient,
              private authService:AuthService) {
    this.paramsSubscription = this.route.params.subscribe();
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data:Data)=>{
        this.sveKategorije = data['kategorije']
      }
    )
  }

  // // @ts-ignore
  // onFileselected(event) {
  //   console.log("jebote event");
  //   this.file = event.target.files[0];
  // }




  submitForm(f: NgForm) {
    const formData = new FormData();
    f.value.userToken = this.authService.user.getValue().id;

    const model = f.value;

    console.log(model);
    formData.append("model",JSON.stringify(model));
    formData.append("file",this.userFile);

      this.http.post('http://localhost:8080/oglas', formData).subscribe(
        (data)=>{}
      )
    }

  // @ts-ignore
  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }


  }




  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }



}


//gluposti

// submitFormAlternativa(){
//   console.log(this.forma);
// }


// onUpload() {
  // this.loading = !this.loading;
  // console.log(this.file);
  // this.fileUploadService.upload(this.file).subscribe(
  //   (event: any) => {
  //     if (typeof (event) === 'object') {
  //
  //       // Short link via api response
  //       this.shortLink = event.link;
  //
  //       this.loading = false; // Flag variable
  //     }
  //   }
  // );
// }
