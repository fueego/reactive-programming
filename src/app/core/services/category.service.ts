import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../interface/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:3000/category';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  getSingleCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  createCategory(cat: Category): Observable<Category> {
    return this.http.post<Category>(this.url, cat);
  }

  removeCategory({ categoryId: id }: Category): Observable<void> {
    return id ? this.http.delete<void>(`${this.url}/${id}`) : of();
  }
}
