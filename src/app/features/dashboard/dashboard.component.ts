import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { CategoryActionEnum } from './components/category-item/category-item.component';
import { LinkActionEnum } from './components/category-link/category-link.component';
import { NoteAction } from './components/category-details/category-details.component';
import { Category } from 'src/app/core/interface/category.model';
import { ComponentActions } from 'src/app/shared/component-action.interface';
import { LinkItemData } from 'src/app/core/interface/link.model';
import { AppMainState } from 'src/app/store/app.state';
import * as select from 'src/app/store/selectors';
import * as actions from 'src/app/store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  allCategories$ = this.store.select(select.getAllCategories);
  allLinks$ = this.store.select(select.getAllLinks);
  linkDetails$ = this.store.select(select.getLinkDetails);
  notes$ = this.store.select(select.getNote);
  unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppMainState>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.CategoryActions.fetchCategories());
    this.store.dispatch(actions.LinkActions.fetchLinks());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleShowAll(): void {
    this.store.dispatch(actions.CategoryActions.clearCategory());
  }

  handleCategoryAction({
    action,
    value: selectCategory,
  }: ComponentActions<CategoryActionEnum, Category>): void {
    switch (action) {
      case CategoryActionEnum.SELECT:
        this.store.dispatch(
          actions.CategoryActions.selectCategory({ selectCategory })
        );
        this.store.dispatch(actions.LinkActions.clearLinkDetails());
        break;

      case CategoryActionEnum.REMOVE:
        this.store.dispatch(
          actions.CategoryActions.removeCategory({ selectCategory })
        );
        break;
    }
  }

  handleLinkAction({
    action,
    value: link,
  }: ComponentActions<LinkActionEnum, LinkItemData>): void {
    switch (action) {
      case LinkActionEnum.DETAILS:
        this.store.dispatch(actions.LinkActions.showLinkDetails({ link }));
        this.store.dispatch(
          actions.NotesActions.fetchLinkNotes({ linkId: link.linkId! })
        );
        break;

      case LinkActionEnum.REMOVE:
        this.store.dispatch(
          actions.LinkActions.removeLink({ linkIdToRemove: link.linkId! })
        );
        break;
    }
  }

  handleNoteEvents({ action, link, notes, newNotes }: NoteAction) {
    switch (action) {
      case 'addNote':
        this.store.dispatch(
          actions.NotesActions.createNote({
            createNote: {
              linkId: link?.linkId ?? '',
              notes: newNotes ?? '',
            },
          })
        );
        break;

      case 'removeNote':
        this.store.dispatch(
          actions.NotesActions.removeNote({ notesId: notes?.notesId ?? '' })
        );
        break;
    }
  }
}
