import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Category } from 'src/app/core/interface/category.model';
import * as select from 'src/app/store/selectors';
import * as actions from 'src/app/store/actions';
import {
  CategoryAction,
  CategoryActionEnum,
} from './components/category-item/category-item.component';
import {
  LinkAction,
  LinkActionEnum,
} from './components/category-link/category-link.component';

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(actions.fetchCategories());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleShowAll(): void {
    this.store.dispatch(actions.clearSelectedCategory());
  }

  checkCategories(category: Category | Category[]): boolean {
    return Array.isArray(category);
  }

  handleCategoryAction({
    action,
    category: selectCategory,
  }: CategoryAction): void {
    switch (action) {
      case CategoryActionEnum.SELECT:
        this.store.dispatch(actions.selectCategory({ selectCategory }));
        break;

      case CategoryActionEnum.REMOVE:
        this.store.dispatch(actions.removeCategory({ selectCategory }));
        break;
    }
  }

  handleLinkAction({ action, link }: LinkAction): void {
    switch (action) {
      case LinkActionEnum.DETAILS:
        this.store.dispatch(actions.showLinkDetails({ link }));
        this.store.dispatch(actions.fetchNotes({ linkId: link.linkId ?? '' }));
        break;

      case LinkActionEnum.REMOVE:
        this.store.dispatch(
          actions.removeLink({ linkIdToRemove: link?.linkId ?? '' })
        );
        break;
    }
  }
}
