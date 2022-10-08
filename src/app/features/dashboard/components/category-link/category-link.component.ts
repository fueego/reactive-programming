import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LinkItemData } from 'src/app/core/interface/link.model';
import { ComponentActions } from 'src/app/shared/component-action.interface';

export enum LinkActionEnum {
  'DETAILS' = 'DETAILS',
  'REMOVE' = 'REMOVE',
}

@Component({
  selector: 'app-category-link',
  templateUrl: './category-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryLinkComponent {
  @Input() linkDetails!: LinkItemData;
  @Output() linkAction = new EventEmitter<
    ComponentActions<LinkActionEnum, LinkItemData>
  >();

  handleLinkClick(): void {
    window.open(this.linkDetails.url, '_blank');
  }

  handleLinkDetails(): void {
    this.linkDetails &&
      this.linkAction.emit({
        action: LinkActionEnum.DETAILS,
        value: this.linkDetails,
      });
  }

  handleRemoveLink(): void {
    this.linkDetails &&
      this.linkAction.emit({
        action: LinkActionEnum.REMOVE,
        value: this.linkDetails,
      });
  }
}
