import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Category } from '../core/interface/category.model';
import { LinkItemData } from '../core/interface/link.model';
import { Notes } from '../core/interface/notes.model';

export const selectMainState = createFeatureSelector<MainState>('main');

export interface MainState {
  selectedCategory: Category | null;
  selectedLink: LinkItemData | null;
  selectedLinkNotes: Notes | null;
  allCategories: Category[];
  allLinks: LinkItemData[];
}

export const getSingleCategory = createSelector(
  selectMainState,
  (state: MainState) => state.selectedCategory
);

export const getAllCategoriesRaw = createSelector(
  selectMainState,
  (state: MainState) => state.allCategories
);

export const getAllCategories = createSelector(
  selectMainState,
  (state: MainState) => {
    const selectedId = state.selectedCategory?.categoryId ?? null;
    if (selectedId) {
      return state.allCategories.filter(
        (link) => link.categoryId === selectedId
      );
    }

    return state.allCategories;
  }
);

export const getAllLinks = createSelector(
  selectMainState,
  (state: MainState) => {
    const selectedId = state.selectedCategory?.categoryId ?? null;
    if (selectedId) {
      return state.allLinks.filter((link) => link.categoryId === selectedId);
    }

    return state.allLinks;
  }
);

export const getLinkDetails = createSelector(
  selectMainState,
  (state: MainState) => {
    return state.selectedLink;
  }
);

export const getNote = createSelector(selectMainState, (state: MainState) => {
  return (
    state.selectedLinkNotes?.linkId === state.selectedLink?.linkId &&
    state.selectedLinkNotes
  );
});
