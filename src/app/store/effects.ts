import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Category } from '../core/interface/category.model';
import { CategoryService } from '../core/services/category.service';
import { LinkService } from '../core/services/link.service';
import { NotesService } from '../core/services/notes.service';
import * as actions from './actions';

@Injectable()
export class CategoryEffects {
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchCategories),
      switchMap(() =>
        this.categorySrvc.getCategories().pipe(
          map((categories) => actions.addCategories({ categories })),
          catchError(() => {
            actions.clearCategories();
            return EMPTY;
          })
        )
      )
    )
  );

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addCategory),
      switchMap(({ newCategory: category }: { newCategory: Category }) =>
        this.categorySrvc.createCategory(category).pipe(
          map(() => actions.fetchCategories()),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  successCategoryAddFetchLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addCategories),
      switchMap(() => of(actions.fetchLinks()))
    )
  );

  removeCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeCategory),
      switchMap(({ selectCategory: category }: { selectCategory: Category }) =>
        this.categorySrvc.removeCategory(category).pipe(
          map(() => actions.fetchCategories()),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  getLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchLinks),
      switchMap(() =>
        this.linksSrvc.getLinks().pipe(
          map((links) => actions.addLinks({ links })),
          catchError(() => {
            actions.clearLinks();
            return EMPTY;
          })
        )
      )
    )
  );

  addLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addLink),
      switchMap(({ link }) =>
        this.linksSrvc.createLink(link).pipe(
          map(() => actions.fetchLinks()),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  removeLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeLink),
      switchMap(({ linkIdToRemove: catIdToRemove }) =>
        this.linksSrvc
          .removeLink(catIdToRemove)
          .pipe(map(() => actions.fetchLinks()))
      ),
      catchError(() => {
        actions.clearLinks();
        return EMPTY;
      })
    )
  );

  fetchNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchNotes),
      switchMap(({ linkId }) =>
        this.notesSrvc
          .fetchNotes(linkId)
          .pipe(
            map((notes) =>
              notes ? actions.addNotes({ notes }) : actions.clearNotes()
            )
          )
      ),
      catchError(() => {
        actions.clearNotes();
        return EMPTY;
      })
    )
  );

  createNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createNotes),
      switchMap(({ createNote }) =>
        this.notesSrvc
          .createNotes(createNote)
          .pipe(map((notes) => actions.fetchNotes({ linkId: notes.linkId })))
      )
    )
  );

  removeNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeNotes),
      switchMap(({ noteId }) =>
        this.notesSrvc.removeNotes(noteId).pipe(map(() => actions.clearNotes()))
      ),
      catchError(() => {
        actions.clearNotes();
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private categorySrvc: CategoryService,
    private linksSrvc: LinkService,
    private notesSrvc: NotesService
  ) {}
}
