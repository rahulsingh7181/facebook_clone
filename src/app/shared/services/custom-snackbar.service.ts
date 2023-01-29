import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) { }

  openSuccessSnackBar(message:string, action:string, dismisTime?: number){
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message:message,
        action: 'Ok',
        icon: 'done',
        snackBar: this._snackBar
      },
      panelClass: 'success-snackbar',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: dismisTime
    });
  }
  openErrorSnackBar(message:string, action:string, dismisTime?: number){
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message:message,
        action: 'Try again',
        icon: 'report_problem',
        snackBar: this._snackBar
      },
      panelClass: 'error-snackbar',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: dismisTime
    });
  }

  openCustomSnackBar(message:string, action:string, type:string, dismisTime?: number){
    if(type==='success'){
      this.openSuccessSnackBar(message, action, dismisTime);
    }
    if(type==='error'){
      this.openErrorSnackBar(message, action, dismisTime);
    }
  }
}
