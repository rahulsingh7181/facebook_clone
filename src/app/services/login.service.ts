import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CurrentUser } from '../models/current-user.model';
import { CustomSnackbarService } from '../shared/services/custom-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser = new Subject<CurrentUser>();

  public tokenExpirationTimer : any;

  baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient,  private cusSnackbarService: CustomSnackbarService, private router: Router) { }

  // to generate jwt token for valid credentials
  public login(loginData: any){
    return this.http.post(this.baseUrl + '/login', loginData);
  }

  // current user - who is logged in
  public getCurrentUser(){
    return this.http.get(this.baseUrl + '/current-user').subscribe({
      next: (user:any) => {
        // set user in localstorage
        const cuser = this.authenticatedCurrentUser(user.userId, user.firstName, user.lastName, user.emailAddress, user.mobileNumber, user.dateOfBirth, user.gender, user.joiningDate, user.profilePic, user.role);
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        console.log("user details not fetched");
        console.log(error);
        this.cusSnackbarService.openCustomSnackBar("Invalid EmailAddress/Password. Please Try again!", 'Try again', 'error', 5000);
      },
      complete: () => {},
    });
  }

  private authenticatedCurrentUser(userId:any, firstName:any, lastName:any, emailAddress:any, mobileNumber:any, dateOfBirth:any, gender:any, joiningDate:any, profilePic:any, role:any){
    const currentUser = new CurrentUser(userId, firstName, lastName, emailAddress, mobileNumber, dateOfBirth, gender, joiningDate, profilePic, role);
    this.currentUser.next(currentUser);
    this.setUserId(userId);
    this.setUser(currentUser);
    let date = new Date().getTime();
    let expiredDate = new Date(this.tokenExpirationTimer).getTime(); 
    this.autoLogOut(expiredDate - date);
  }

  // validate token
  public isTokenValid(expiresIn:any){
    if(!expiresIn || new Date() > expiresIn){
      return false;
    }
    return true;
  }

  // logout: remove token from localstorage
  public logout(){
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['login']);
  }

  // auto logout
  public autoLogOut(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // set token in localstorage
  public setToken(token:string, expiresIn:any){
    this.tokenExpirationTimer = expiresIn;
    localStorage.setItem("token", token);
  }

  // set userId
  public setUserId(userId:string){
    return localStorage.setItem("userId", userId);
  }
  // get userId
  public getUserId(){
    return localStorage.getItem("userId");
  }
  // isUserLoggedIn: user is logged in or not
  public isUserLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == "" || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }
  // get token
  public getToken(){
    return localStorage.getItem("token");
  }

  // set user details in localstorage
  public setUser(user:any){
    return localStorage.setItem("userDetails", JSON.stringify(user));
  }

  // get user details from localstorage
  public getUser(){
    let userDetail = localStorage.getItem("userDetails");
    if(userDetail != null){
      return JSON.parse(userDetail);
    }else{
      this.logout();
      return null;
    }
  }
}
