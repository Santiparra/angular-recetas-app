import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export class AuthEffects {
    
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        ) {}

    authLogin = createEffect( () => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
            .post<AuthResponseData>(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+ environment.firebaseAPIKey,
                {
                  email: authData.payload.email,
                  password: authData.payload.password,
                  returnSecureToken: true
                }
              ).pipe(
                map(resData => {
                    const expiretionDate = new Date(new Date().getTime() + +resData.expiresIn *1000); 
                    return of(new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expiretionDate
                    }))
                  }),
                catchError(error => {
                return of(); 
              }),)
        }),

    )
    )

}
/* Instead of this code:

@Effect
authLogin = this.actions$.pipe(...)
(as I'll write it in the next lecture)

You should write this code:

authLogin = createEffect(() => this.actions$.pipe(...));
createEffect must be imported from @ngrx/effects

import { createEffect } from '@ngrx/effect'; */