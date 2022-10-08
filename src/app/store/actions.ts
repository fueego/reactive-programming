import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../core/interface/category.model';
import { LinkItemData } from '../core/interface/link.model';
import { Notes } from '../core/interface/notes.model';

// Category actions
export const CategoryActions = createActionGroup({
  source: 'Dashboard page',
  events: {
    'Select category': props<{ selectCategory: Category }>(),
    'Add categories': props<{ categories: Category[] }>(),
    'Add category': props<{ newCategory: Category }>(),
    'Remove category': props<{ selectCategory: Category }>(),
    'Clear category': emptyProps(),
    'Clear categories': emptyProps(),
    'Fetch categories': emptyProps(),
  },
});

// Link actions
export const LinkActions = createActionGroup({
  source: 'Dashboard page',
  events: {
    'Add links': props<{ links: LinkItemData[] }>(),
    'Add link': props<{ link: LinkItemData }>(),
    'Remove link': props<{ linkIdToRemove: string }>(),
    'Show link details': props<{ link: LinkItemData }>(),
    'Clear link details': emptyProps(),
    'Fetch links': emptyProps(),
  },
});

// Notes
export const NotesActions = createActionGroup({
  source: 'Dashboard page',
  events: {
    'Add notes': props<{ notes: Notes }>(),
    'Create note': props<{ createNote: Notes }>(),
    'Remove note': props<{ notesId: string }>(),
    'Fetch link notes': props<{ linkId: string }>(),
    'Clear notes': emptyProps(),
  },
});
