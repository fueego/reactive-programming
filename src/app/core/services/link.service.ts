import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LinkItemData } from '../interface/link.model';
import { handleErrorExposure } from './helpers/error-handler.helper';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  url = `${environment.host}/link`;

  constructor(
    private http: HttpClient,
    private notificationSrvc: NotificationsService
  ) {}

  getLinks(): Observable<LinkItemData[]> {
    return this.http
      .get<LinkItemData[]>(this.url)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          handleErrorExposure(this.notificationSrvc, err)
        )
      );
  }

  getSingleLink(id: string): Observable<LinkItemData> {
    return this.http
      .get<LinkItemData>(`${this.url}/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          handleErrorExposure(this.notificationSrvc, err)
        )
      );
  }

  createLink(cat: LinkItemData): Observable<LinkItemData> {
    return this.http
      .post<LinkItemData>(this.url, cat)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          handleErrorExposure(this.notificationSrvc, err)
        )
      );
  }

  removeLink(linkId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${linkId}`)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          handleErrorExposure(this.notificationSrvc, err)
        )
      );
  }
}
