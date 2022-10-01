import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LinkItemData } from 'src/app/core/interface/link.model';

export enum LinkActionEnum {
  'DETAILS' = 'DETAILS',
  'REMOVE' = 'REMOVE',
}

export interface LinkAction {
  action: LinkActionEnum;
  link: LinkItemData;
}

@Component({
  selector: 'app-category-link',
  templateUrl: './category-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryLinkComponent {
  @Input() linkDetails!: LinkItemData;
  @Output() linkAction = new EventEmitter<LinkAction>();

  handleLinkClick(): void {
    window.open(this.linkDetails.url, '_blank');
  }

  handleLinkDetails(): void {
    this.linkDetails &&
      this.linkAction.emit({
        action: LinkActionEnum.DETAILS,
        link: this.linkDetails,
      });
  }

  handleRemoveLink(): void {
    this.linkDetails &&
      this.linkAction.emit({
        action: LinkActionEnum.REMOVE,
        link: this.linkDetails,
      });
  }
}
