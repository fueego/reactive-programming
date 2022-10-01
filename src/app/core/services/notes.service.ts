import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notes } from '../interface/notes.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  url = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  fetchNotes(linkId: string): Observable<Notes> {
    return this.http.get<Notes>(`${this.url}/${linkId}`);
  }

  createNotes(createNote: Notes): Observable<Notes> {
    return this.http.post<Notes>(this.url, createNote);
  }

  removeNotes(noteId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${noteId}`);
  }
}
