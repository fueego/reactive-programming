import { createAction, props } from '@ngrx/store';
import { Category } from '../core/interface/category.model';
import { LinkItemData } from '../core/interface/link.model';
import { Notes } from '../core/interface/notes.model';
import { NewCategoryData } from '../shared/components/modals/add-new-category/new-category.interface';

// Category actions
export const selectCategory = createAction(
  '[Header] category selected',
  props<{ selectCategory: Category }>()
);
export const clearSelectedCategory = createAction('[Header] clear category');
export const addCategories = createAction(
  '[App] add categories',
  props<{ categories: Category[] }>()
);
export const addCategory = createAction(
  '[App] add category',
  props<{ newCategory: Category }>()
);
export const clearCategories = createAction('[App] clear categories');
export const removeCategory = createAction(
  '[Dashboard] remove category',
  props<{ selectCategory: Category }>()
);

// Link actions
export const addLinks = createAction(
  '[App] Add links',
  props<{ links: LinkItemData[] }>()
);
export const addLink = createAction(
  '[App] Add link',
  props<{ link: LinkItemData }>()
);
export const clearLinks = createAction('[App] Clear links');
export const removeLink = createAction(
  '[Dashboard] Remove link',
  props<{ linkIdToRemove: string }>()
);
export const showLinkDetails = createAction(
  '[App] Show link details',
  props<{ link: LinkItemData }>()
);

// Notes
export const addNotes = createAction(
  '[Dashboard] Add notes',
  props<{ notes: Notes }>()
);
export const clearNotes = createAction('[Dashboard] Clear notes');
export const createNotes = createAction(
  '[Dashboard] Create note',
  props<{ createNote: Notes }>()
);
export const removeNotes = createAction(
  '[Dashboard] Remove note',
  props<{ noteId: string }>()
);

// Fetch
export const fetchCategories = createAction('[Dashboard] fetch categories');
export const fetchLinks = createAction('[Dashboard] fetch links');
export const fetchNotes = createAction(
  '[Dashboard] fetch link details note',
  props<{ linkId: string }>()
);
