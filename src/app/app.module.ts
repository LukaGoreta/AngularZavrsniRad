import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { OglasComponent } from './oglas/oglas.component';
import { OglasDetailComponent } from './oglas-detail/oglas-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { KategorijeComponent } from './kategorije/kategorije.component';
import { TrazilicaComponent } from './trazilica/trazilica.component';
import {RouterModule, Routes} from "@angular/router";
import { UnosOglasaComponent } from './unos-oglasa/unos-oglasa.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import { FooterComponent } from './footer/footer.component';
import { SviOglasiComponent } from './svi-oglasi/svi-oglasi.component';
import {OglasService} from "./oglas.service";
import {KategorijaService} from "./kategorija.service";
import {OglasResolver} from "./svi-oglasi/svi-oglasi-resolver.service";
import {KategorijaResolver} from "./kategorije/sve-kategorije-resolver";
import {OglasKategorijaResolver} from "./oglas/oglas-kategorija-resolver.service";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { LoginComponent } from './login/login.component';
import {AuthService} from "./auth.service";
import { RegistracijaComponent } from './registracija/registracija.component';
import {AuthGuard} from "./auth.guard";
import { UserOglasiComponent } from './user-oglasi/user-oglasi.component';
import {UserOglasiResolver} from "./user-oglasi/user-oglasi-resolver.service";

const appRoutes : Routes = [
  {path: '', redirectTo: 'pocetna', pathMatch: 'full'},
  {path: 'pocetna', component: PocetnaComponent,
    children:[
      {path: '',component: SviOglasiComponent, resolve:{oglasi: OglasResolver}},
      {path: ':oglasId', component: OglasDetailComponent}
    ]
  },
  {path: 'kategorije', component: KategorijeComponent, resolve:{oglasKategorije:OglasKategorijaResolver,kategorije: KategorijaResolver},
    children: [
      {path: ':nazivKategorije', component: OglasComponent, resolve:{oglasKategorije:OglasKategorijaResolver}},
      {path: ':nazivKategorije/:oglasId', component: OglasDetailComponent}
    ]
  },
  {path: 'unosOglasa', component: UnosOglasaComponent,canActivate: [AuthGuard], resolve:{kategorije: KategorijaResolver}},
  {path: 'trazilica', component: TrazilicaComponent},
  {path: 'mojiOglasi', component: UserOglasiComponent, canActivate:[AuthGuard], resolve:{userOglasi: UserOglasiResolver}},
  {path: 'login', component: LoginComponent},
  {path: 'registracija',component: RegistracijaComponent},
  { path: '**', redirectTo: 'pocetna'}
]

@NgModule({
  declarations: [
    AppComponent,
    OglasComponent,
    OglasDetailComponent,
    NavbarComponent,
    KategorijeComponent,
    TrazilicaComponent,
    UnosOglasaComponent,
    PocetnaComponent,
    FooterComponent,
    SviOglasiComponent,
    LoginComponent,
    RegistracijaComponent,
    UserOglasiComponent
  ],
  imports: [
    MatGridListModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [OglasResolver,OglasKategorijaResolver,KategorijaResolver,UserOglasiResolver,OglasService,KategorijaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
