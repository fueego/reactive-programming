import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Category } from 'src/app/core/interface/category.model';

export enum CategoryActionEnum {
  SELECT = 'SELECT',
  REMOVE = 'REMOVE',
}

export interface CategoryAction {
  action: CategoryActionEnum;
  category: Category;
}

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItemComponent {
  @Input() categoryDetails: Category | null = null;
  @Output() categoryAction = new EventEmitter<CategoryAction>();

  handleCategoryClick(): void {
    this.categoryDetails &&
      this.categoryAction.emit({
        action: CategoryActionEnum.SELECT,
        category: this.categoryDetails,
      });
  }

  handleRemoveCategory(): void {
    this.categoryDetails &&
      this.categoryAction.emit({
        action: CategoryActionEnum.REMOVE,
        category: this.categoryDetails,
      });
  }
}
