import { createReducer, on } from '@ngrx/store';
import { initialMainState } from './selectors';
import * as actions from './actions';

export const mainStateReducer = createReducer(
  initialMainState,
  on(actions.CategoryActions.selectCategory, (state, { selectCategory }) => ({
    ...state,
    selectedCategory: selectCategory,
    selectedLinkNotes: null,
    selectedLink: null,
  })),

  on(actions.CategoryActions.clearCategory, (state) => ({
    ...state,
    selectedCategory: null,
    selectedLinkNotes: null,
    selectedLink: null,
  })),

  on(actions.CategoryActions.addCategories, (state, { categories }) => ({
    ...state,
    allCategories: categories,
  })),

  on(actions.CategoryActions.clearCategories, (state) => ({
    ...state,
    allCategories: [],
  })),

  on(
    actions.CategoryActions.removeCategory,
    actions.LinkActions.clearLinkDetails,
    (state) => {
      return {
        ...state,
        selectedLinkNotes: null,
        selectedLink: null,
      };
    }
  ),

  on(actions.LinkActions.addLinks, (state, { links }) => ({
    ...state,
    allLinks: links,
  })),

  on(actions.LinkActions.showLinkDetails, (state, { link }) => ({
    ...state,
    selectedLink: link,
  })),

  on(actions.LinkActions.removeLink, (state) => {
    return {
      ...state,
      selectedLinkNotes: null,
      selectedLink: null,
    };
  }),

  on(actions.NotesActions.addNotes, (state, { notes }) => ({
    ...state,
    selectedLinkNotes: { ...notes },
  })),

  on(actions.NotesActions.clearNotes, (state) => ({
    ...state,
    selectedLinkNotes: null,
  }))
);
