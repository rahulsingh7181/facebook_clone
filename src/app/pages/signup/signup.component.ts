import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SignupService } from 'src/app/services/signup.service';
import { CustomSnackbarService } from 'src/app/shared/services/custom-snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  constructor(
    private signupService: SignupService,
    private cusSnackbarService: CustomSnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // signup form field validation
  signupForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]*$')
    ]), 
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z ]*$')
    ]), 
    emailAddress: new FormControl('', [
      Validators.required,
      Validators.email
    ]), 
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'), 
      Validators.minLength(10),
      Validators.maxLength(10) 
    ]), 
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15) 
    ]), 
    dateOfBirth: new FormControl('',[
      Validators.required
    ]), 
    gender: new FormControl('',[
      Validators.required
    ])
  });

  // signupForm submitted
  signupFormSubmitted(){
    // set form data into User Model
    let user: User = {
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      emailAddress: this.EmailAddress.value,
      mobileNumber: this.MobileNumber.value,
      password: this.Password.value,
      dateOfBirth: this.DateOfBirth.value,
      gender: this.Gender.value,
    }
    // call signup() from signupService to  submit user form data into Database
    this.signupService.signup(user).subscribe({
      next: (res:any) => {
        let body = JSON.parse(JSON.stringify(res));
        if(body.status === "EMAIL_ALREADY_EXISTS"){
          this.cusSnackbarService.openCustomSnackBar(body.message, 'Try again', 'error',5000);
        }else if(body.status === "MOBILE_NUMBER_ALREADY_EXISTS"){
          this.cusSnackbarService.openCustomSnackBar(body.message, 'Try again', 'error',5000);
        }else{
          this.router.navigate(['/login']);
          this.cusSnackbarService.openCustomSnackBar(body.message+" Please login !", 'Ok', 'success',5000)
          this.clearForm();
        }
      },
      error: (error:any) => {
        this.cusSnackbarService.openCustomSnackBar("Internal server error. Please contact to Administrator.", 'Ok', 'error', 5000);
        this.clearForm();
      },
      complete: () => {},
    });
  }

  // clear form
  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.EmailAddress.setValue('');
    this.MobileNumber.setValue('');
    this.Password.setValue('');
    this.DateOfBirth.setValue('');
    this.Gender.setValue('');
  }

  // getters method
  get FirstName(): FormControl{
    return this.signupForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl{
    return this.signupForm.get('lastName') as FormControl;
  }
  get EmailAddress(): FormControl{
    return this.signupForm.get('emailAddress') as FormControl;
  }
  get MobileNumber(): FormControl{
    return this.signupForm.get('mobileNumber') as FormControl;
  }
  get Password(): FormControl{
    return this.signupForm.get('password') as FormControl;
  }
  get DateOfBirth(): FormControl{
    return this.signupForm.get('dateOfBirth') as FormControl;
  }
  get Gender(): FormControl{
    return this.signupForm.get('gender') as FormControl;
  }
  
}
