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
      ofType(actions.CategoryActions.fetchCategories),
      switchMap(() =>
        this.categorySrvc.getCategories().pipe(
          map((categories) =>
            actions.CategoryActions.addCategories({ categories })
          ),
          catchError(() => of(actions.CategoryActions.clearCategories()))
        )
      )
    )
  );

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.CategoryActions.addCategory),
      switchMap(({ newCategory: category }: { newCategory: Category }) =>
        this.categorySrvc.createCategory(category).pipe(
          map(() => actions.CategoryActions.fetchCategories()),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  removeCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.CategoryActions.removeCategory),
      switchMap(({ selectCategory: category }: { selectCategory: Category }) =>
        this.categorySrvc.removeCategory(category).pipe(
          catchError(() => {
            return EMPTY;
          })
        )
      ),
      switchMap(() => [
        actions.CategoryActions.fetchCategories(),
        actions.LinkActions.fetchLinks(),
      ])
    )
  );

  getLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LinkActions.fetchLinks),
      switchMap(() =>
        this.linksSrvc.getLinks().pipe(
          map((links) => actions.LinkActions.addLinks({ links })),
          catchError(() => of(actions.LinkActions.clearLinkDetails()))
        )
      )
    )
  );

  addLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LinkActions.addLink),
      switchMap(({ link }) =>
        this.linksSrvc.createLink(link).pipe(
          map(() => actions.LinkActions.fetchLinks()),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  removeLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LinkActions.removeLink),
      switchMap(({ linkIdToRemove }) =>
        this.linksSrvc
          .removeLink(linkIdToRemove)
          .pipe(map(() => actions.LinkActions.fetchLinks()))
      ),
      catchError(() => of(actions.LinkActions.clearLinkDetails()))
    )
  );

  fetchNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.NotesActions.fetchLinkNotes),
      switchMap(({ linkId }) =>
        this.notesSrvc.fetchNotes(linkId).pipe(
          map((notes) => actions.NotesActions.addNotes({ notes })),
          catchError(() => of(actions.NotesActions.clearNotes()))
        )
      )
    )
  );

  createNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.NotesActions.createNote),
      switchMap(({ createNote }) =>
        this.notesSrvc
          .createNotes(createNote)
          .pipe(
            map((notes) =>
              actions.NotesActions.fetchLinkNotes({ linkId: notes.linkId })
            )
          )
      )
    )
  );

  removeNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.NotesActions.removeNote),
      switchMap(({ notesId }) =>
        this.notesSrvc.removeNotes(notesId).pipe(
          map(() => actions.NotesActions.clearNotes()),
          catchError(() => of(actions.NotesActions.clearNotes()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categorySrvc: CategoryService,
    private linksSrvc: LinkService,
    private notesSrvc: NotesService
  ) {}
}
