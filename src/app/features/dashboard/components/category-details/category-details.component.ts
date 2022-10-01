import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { LinkItemData } from 'src/app/core/interface/link.model';
import { Notes } from 'src/app/core/interface/notes.model';
import * as actions from 'src/app/store/actions';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailsComponent {
  @Input() linkDetails: LinkItemData | null = null;
  @Input() notes: false | Notes | null = null;

  noteData = '';

  constructor(private store: Store) {}

  addNote(): void {
    !!this.noteData &&
      this.store.dispatch(
        actions.createNotes({
          createNote: {
            categoryId: this.linkDetails?.categoryId ?? '',
            linkId: this.linkDetails?.linkId ?? '',
            notes: this.noteData,
          },
        })
      );

    this.noteData = '';
  }

  removeNote(noteId: string): void {
    !!noteId && this.store.dispatch(actions.removeNotes({ noteId }));
  }
}
