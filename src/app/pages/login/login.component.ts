import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CustomSnackbarService } from 'src/app/shared/services/custom-snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private cusSnackbarService: CustomSnackbarService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  loginFormSubmitted(){
    let loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    // calling login() of login service
    this.loginService.login(loginData).subscribe({
      next: (data:any) => {
        let body = JSON.parse(JSON.stringify(data));
        
        // set token in localstorage
        if(this.loginService.isTokenValid(body.expiresIn)){
          this.loginService.setToken(body.token, body.expiresIn);
        }
        // calling getCurrentUser() of login service
        const user = this.loginService.getCurrentUser();
        
      },
      error: (error: any) => {
        console.log(error);
        this.cusSnackbarService.openCustomSnackBar("Internal server error.", 'Try again', 'error', 5000);
      },
      complete: () => {},
    });
  }

  // getters method
  get Username(): FormControl{  
    return this.loginForm.get('username') as FormControl;
  }
  get Password(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }
}
