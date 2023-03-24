import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  user = new BehaviorSubject<User>(null);
  tokenTimer: any;

  registrarse(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleErrors),
        tap(resData => {
          this.handleAuth(
            resData.email, 
            resData.localId, 
            resData.idToken, 
            +resData.expiresIn)
        })
      )
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+ environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleErrors), 
      tap(resData => {
        this.handleAuth(
          resData.email, 
          resData.localId, 
          resData.idToken, 
          +resData.expiresIn)
      })
    )    
  }

  autoLogin(): void {
    const userData: {
      email: string; 
      id: string;
      _token: string;
      _expDate: Date
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expDate)
    )
    if (loadedUser.token) {      
      this.user.next(loadedUser);
      const expirationDuration = 
        new Date(userData._expDate).getTime() - 
        new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  logOut(): void {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer)
    }
    this.tokenTimer = null
    
  }
  
  autoLogout(expirationDuration: number): void {
    console.log(expirationDuration);
    this.tokenTimer = setTimeout( () => {
      this.logOut()
    } ,expirationDuration)
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number): void {
    const expiretionDate = new Date(new Date().getTime() + expiresIn *1000) 
    const user = new User(
      email, 
      userId, 
      token, 
      expiretionDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user))
  }

  //el caso de email y contraseña puede mejorarse pa no dar tanta info
  private handleErrors(errorRes: HttpErrorResponse) {
    let errorMsg = "Hubo un error inesperado"
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMsg)
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMsg = "Ya hay un usuario con este email";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg = "Este email no esta registrado";
        break;  
      case "INVALID_PASSWORD":
        errorMsg = "Esta contraseña no es correcta";
        break;   
    }
    return throwError(() => errorMsg)
  }

}
