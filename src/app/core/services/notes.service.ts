import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notes } from '../interface/notes.model';
import { handleErrorExposure } from './helpers/error-handler.helper';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  url = `${environment.host}/notes`;

  constructor(
    private http: HttpClient,
    private notificationSrvc: NotificationsService
  ) {}

  fetchNotes(linkId: string): Observable<Notes> {
    return this.http.get<Notes>(`${this.url}/${linkId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          console.error('Notes message not found');
          return EMPTY;
        } else {
          return handleErrorExposure(this.notificationSrvc, err);
        }
      })
    );
  }

  createNotes(createNote: Notes): Observable<Notes> {
    return this.http
      .post<Notes>(this.url, createNote)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          handleErrorExposure(this.notificationSrvc, err)
        )
      );
  }

  removeNotes(notesId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${notesId}`)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          handleErrorExposure(this.notificationSrvc, err)
        )
      );
  }
}
