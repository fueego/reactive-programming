import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HeaderComponent } from './header.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { AddNewCategoryModule } from '../modals/add-new-category/add-new-category.module';
import { AddNewLinkModule } from '../modals/add-new-link/add-new-link.module';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    AutocompleteModule,
    MatDialogModule,
    RouterModule,
    AddNewCategoryModule,
    AddNewLinkModule,
    MatSnackBarModule,
  ],
  exports: [HeaderComponent],
  providers: [NotificationsService],
})
export class HeaderModule {}
