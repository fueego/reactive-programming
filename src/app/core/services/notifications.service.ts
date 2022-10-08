import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationsService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBarSuccess(message: string, action = 'Ok') {
    this._snackBar.open(message, action, {
      panelClass: ['success-snackbar'],
    });
  }
}
