import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryLinkComponent } from './category-link.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CategoryLinkComponent],
  imports: [CommonModule, MatIconModule],
  exports: [CategoryLinkComponent],
})
export class CategoryLinkModule {}
