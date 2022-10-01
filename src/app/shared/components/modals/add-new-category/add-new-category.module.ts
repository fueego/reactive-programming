import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';

import { AddNewCategoryComponent } from './add-new-category.component';

@NgModule({
  declarations: [AddNewCategoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxMatColorPickerModule,
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  exports: [AddNewCategoryComponent],
})
export class AddNewCategoryModule {}
