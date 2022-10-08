import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, of, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/core/interface/category.model';
import { LinkItemData } from 'src/app/core/interface/link.model';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { AddNewCategoryComponent } from '../modals/add-new-category/add-new-category.component';
import { NewCategoryData } from '../modals/add-new-category/new-category.interface';
import { AddNewLinkComponent } from '../modals/add-new-link/add-new-link.component';
import { AppMainState } from 'src/app/store/app.state';
import * as actions from 'src/app/store/actions';
import * as select from 'src/app/store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  showMobileMenu = false;
  autocompleteCategories$ = this.store.select(select.getAllCategoriesRaw);

  constructor(
    public dialog: MatDialog,
    private store: Store<AppMainState>,
    private notification: NotificationsService
  ) {}

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(AddNewCategoryComponent);
    let newCategory = '';

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        tap((newCat: NewCategoryData) => (newCategory = newCat.name)),
        switchMap((newCategory: NewCategoryData) =>
          of(
            this.store.dispatch(
              actions.CategoryActions.addCategory({
                newCategory: {
                  ...newCategory,
                  color: `#${newCategory?.color?.hex}`,
                },
              })
            )
          )
        )
      )
      .subscribe({
        next: () => {
          this.notification.openSnackBarSuccess(
            `Dodałeś kategorię ${newCategory}`
          );
        },
      });
  }

  openAddLinkModal(): void {
    const dialogRef = this.dialog.open(AddNewLinkComponent, {
      data: {
        categories$: this.autocompleteCategories$,
      },
    });
    let newLinkAdd = '';

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        tap((newLink: LinkItemData) => (newLinkAdd = newLink.shortDescription)),
        switchMap((link: LinkItemData) =>
          of(
            this.store.dispatch(
              actions.LinkActions.addLink({
                link,
              })
            )
          )
        )
      )
      .subscribe({
        next: () => {
          this.notification.openSnackBarSuccess(
            `Dodałeś nowy link ${newLinkAdd}`
          );
        },
      });
  }

  handleCategorySelection(category: Category): void {
    category.categoryId !== null
      ? this.store.dispatch(
          actions.CategoryActions.selectCategory({ selectCategory: category })
        )
      : this.store.dispatch(actions.CategoryActions.clearCategory());
  }
}
