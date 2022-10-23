import { Observable, throwError } from 'rxjs';
import { NotificationsService } from '../notifications.service';

export function handleErrorExposure(
  notification: NotificationsService,
  error: { statusText: string; message: string }
): Observable<never> {
  notification.openSnackBarError(error.statusText || error.message);
  return throwError(() => console.error('Server issue'));
}
