import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  inLoggedMode = true;
  isLoading = false;
  error: string = null;

  authObservable: Observable<AuthResponseData>;


  onSwitchMode(): void {
    this.inLoggedMode = !this.inLoggedMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true
    if (this.inLoggedMode) {
      this.authObservable = this.authService.login(email, password)        
    } else {
      this.authObservable = this.authService.registrarse(email, password)
    }
    this.authObservable.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false
        this.router.navigate(["/recipes"])
      },
      errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
        this.isLoading = false
      }
    )
    form.reset()
  }



}
