import { createReducer, on } from '@ngrx/store';
import { MainState } from './selectors';
import * as actions from './actions';

export const initialMainState: MainState = {
  selectedCategory: null,
  selectedLink: null,
  selectedLinkNotes: null,
  allCategories: [],
  allLinks: [],
};

export const mainStateReducer = createReducer(
  initialMainState,
  on(actions.selectCategory, (state, { selectCategory }) => ({
    ...state,
    selectedCategory: selectCategory,
  })),

  on(actions.clearSelectedCategory, (state) => ({
    ...state,
    selectedCategory: null,
  })),

  on(actions.addCategories, (state, { categories }) => ({
    ...state,
    allCategories: categories,
  })),

  on(actions.clearCategories, (state) => ({
    ...state,
    allCategories: [],
  })),

  on(actions.removeCategory, (state, { selectCategory }) => {
    const isNotesReadyToRemove =
      state.selectedLinkNotes?.categoryId === selectCategory.categoryId;
    const isSelectedLinkReadyToRemove =
      state.selectedLink?.categoryId === selectCategory.categoryId;

    return {
      ...state,
      selectedLinkNotes: isNotesReadyToRemove ? null : state.selectedLinkNotes,
      selectedLink: isSelectedLinkReadyToRemove ? null : state.selectedLink,
    };
  }),

  on(actions.addLinks, (state, { links }) => ({
    ...state,
    allLinks: links,
  })),

  on(actions.showLinkDetails, (state, { link }) => ({
    ...state,
    selectedLink: link,
  })),

  on(actions.clearCategories, (state) => ({
    ...state,
    allLinks: [],
  })),

  on(actions.removeLink, (state, { linkIdToRemove }) => {
    const isNotesReadyToRemove =
      state.selectedLinkNotes?.linkId === linkIdToRemove;
    const isSelectedLinkReadyToRemove =
      state.selectedLink?.linkId === linkIdToRemove;

    return {
      ...state,
      selectedLinkNotes: isNotesReadyToRemove ? null : state.selectedLinkNotes,
      selectedLink: isSelectedLinkReadyToRemove ? null : state.selectedLink,
    };
  }),

  on(actions.addNotes, (state, { notes }) => ({
    ...state,
    selectedLinkNotes: { ...notes },
  })),

  on(actions.clearNotes, (state) => ({
    ...state,
    selectedLinkNotes: null,
  }))
);
