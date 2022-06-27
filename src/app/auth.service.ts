import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {User} from "./user/user.model";

export interface FirebaseAuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
  // @ts-ignore
  user = new BehaviorSubject<User>(null);
  private expirationTimer:any;


constructor(private http: HttpClient) {}

  logoutUser(){
    // @ts-ignore
    this.user.next(null);
    localStorage.removeItem('userData');

    if(this.expirationTimer){
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;

  }



  signup(email: string, password: string) {
    return this.http
      .post<FirebaseAuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAiq7mYgG0cO8H06_zi1GbWHa75S4gvQZc',
        {email: email, password: password, returnSecureToken: true
        }
      )
      .pipe(
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'Ovaj email se već koristi!';
          }
          return throwError(errorMessage);
        })
      );
  }

  autoLogout(duration: number){
    this.expirationTimer = setTimeout(()=>{
      this.logoutUser();
    },duration);
  }

  autoLogin(){

    const userData:{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
      // @ts-ignore
    } =   JSON.parse(localStorage.getItem('userData'));
    if(userData == null){
      return;
    }
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const newExpirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(newExpirationDate);
    }
  }


  signin(email: string, password: string) {
    return this.http
      .post<FirebaseAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiq7mYgG0cO8H06_zi1GbWHa75S4gvQZc',
        {email: email, password: password, returnSecureToken: true
        }
      )
      .pipe(
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'Email not found';
          }
          return throwError(errorMessage);
        }), tap(resData =>{
          // @ts-ignore
          const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
          const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);

          this.user.next(user);

          // @ts-ignore
          this.autoLogout(resData.expiresIn*1000);

          localStorage.setItem('userData', JSON.stringify(user));

        })
      );
  }



}
