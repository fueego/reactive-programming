import { Category } from 'src/app/core/interface/category.model';
import { LinkItemData } from 'src/app/core/interface/link.model';

export interface DetailsItemData
  extends Pick<Category, 'categoryId'>,
    Pick<LinkItemData, 'linkId' | 'url' | 'shortDescription'> {
  categoryId: string;
  notes: string;
}
