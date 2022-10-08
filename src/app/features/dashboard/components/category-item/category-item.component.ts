import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Category } from 'src/app/core/interface/category.model';
import { ComponentActions } from 'src/app/shared/component-action.interface';

export enum CategoryActionEnum {
  SELECT = 'SELECT',
  REMOVE = 'REMOVE',
}

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItemComponent {
  @Input() categoryDetails: Category | null = null;
  @Output() categoryAction = new EventEmitter<
    ComponentActions<CategoryActionEnum, Category>
  >();

  handleCategoryClick(): void {
    this.categoryDetails &&
      this.categoryAction.emit({
        action: CategoryActionEnum.SELECT,
        value: this.categoryDetails,
      });
  }

  handleRemoveCategory(): void {
    this.categoryDetails &&
      this.categoryAction.emit({
        action: CategoryActionEnum.REMOVE,
        value: this.categoryDetails,
      });
  }
}
