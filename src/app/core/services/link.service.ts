import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkItemData } from '../interface/link.model';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  url = 'http://localhost:3000/link';

  constructor(private http: HttpClient) {}

  getLinks(): Observable<LinkItemData[]> {
    return this.http.get<LinkItemData[]>(this.url);
  }

  getSingleLink(id: string): Observable<LinkItemData> {
    return this.http.get<LinkItemData>(`${this.url}/${id}`);
  }

  createLink(cat: LinkItemData): Observable<LinkItemData> {
    return this.http.post<LinkItemData>(this.url, cat);
  }

  removeLink(linkId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${linkId}`);
  }
}
