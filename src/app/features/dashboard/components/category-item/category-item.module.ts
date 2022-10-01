import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from './category-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CategoryItemComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  exports: [CategoryItemComponent],
})
export class CategoryItemModule {}
