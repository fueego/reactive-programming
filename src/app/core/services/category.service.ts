import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interface/category.model';
import { handleErrorExposure } from './helpers/error-handler.helper';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = `${environment.host}/category`;

  constructor(
    private http: HttpClient,
    private notificationSrvc: NotificationsService
  ) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.url)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          handleErrorExposure(this.notificationSrvc, err)
        )
      );
  }

  getSingleCategory(id: string): Observable<Category> {
    return this.http
      .get<Category>(`${this.url}/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          handleErrorExposure(this.notificationSrvc, err)
        )
      );
  }

  createCategory(cat: Category): Observable<Category> {
    return this.http
      .post<Category>(this.url, cat)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          handleErrorExposure(this.notificationSrvc, err)
        )
      );
  }

  removeCategory({ categoryId: id }: Category): Observable<void> {
    return id
      ? this.http
          .delete<void>(`${this.url}/${id}`)
          .pipe(
            catchError((err: HttpErrorResponse) =>
              handleErrorExposure(this.notificationSrvc, err)
            )
          )
      : of();
  }
}
