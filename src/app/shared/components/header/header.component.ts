import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, of, switchMap } from 'rxjs';
import { Category } from 'src/app/core/interface/category.model';
import { LinkItemData } from 'src/app/core/interface/link.model';
import * as actions from 'src/app/store/actions';
import * as select from 'src/app/store/selectors';
import { AddNewCategoryComponent } from '../modals/add-new-category/add-new-category.component';
import { NewCategoryData } from '../modals/add-new-category/new-category.interface';
import { AddNewLinkComponent } from '../modals/add-new-link/add-new-link.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  showMobileMenu = false;
  autocompleteCategories$ = this.store.select(select.getAllCategoriesRaw);

  constructor(public dialog: MatDialog, private store: Store) {}

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(AddNewCategoryComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        switchMap((newCategory: NewCategoryData) =>
          of(
            this.store.dispatch(
              actions.addCategory({
                newCategory: {
                  ...newCategory,
                  color: `#${newCategory?.color?.hex}`,
                },
              })
            )
          )
        )
      )
      .subscribe(() => {
        // TODO: show success notification with category name
      });
  }

  openAddLinkModal(): void {
    const dialogRef = this.dialog.open(AddNewLinkComponent, {
      data: {
        categories$: this.autocompleteCategories$,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        switchMap((link: LinkItemData) =>
          of(
            this.store.dispatch(
              actions.addLink({
                link,
              })
            )
          )
        )
      )
      .subscribe(() => {
        // TODO: show success notification with category name
      });
  }

  handleCategorySelection(category: Category): void {
    category.categoryId !== null
      ? this.store.dispatch(
          actions.selectCategory({ selectCategory: category })
        )
      : this.store.dispatch(actions.clearSelectedCategory());
  }
}
