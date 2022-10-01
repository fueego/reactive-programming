import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { AddNewCategoryModule } from '../modals/add-new-category/add-new-category.module';
import { AddNewLinkModule } from '../modals/add-new-link/add-new-link.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    AutocompleteModule,
    MatDialogModule,
    RouterModule,
    AddNewCategoryModule,
    AddNewLinkModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
