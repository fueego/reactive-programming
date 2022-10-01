import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CategoryDetailsComponent } from './category-details.component';

@NgModule({
  declarations: [CategoryDetailsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [CategoryDetailsComponent],
})
export class CategoryDetailsModule {}
