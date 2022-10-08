import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notes } from '../interface/notes.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  url = `${environment.host}/notes`;

  constructor(private http: HttpClient) {}

  fetchNotes(linkId: string): Observable<Notes> {
    return this.http.get<Notes>(`${this.url}/${linkId}`);
  }

  createNotes(createNote: Notes): Observable<Notes> {
    return this.http.post<Notes>(this.url, createNote);
  }

  removeNotes(notesId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${notesId}`);
  }
}
