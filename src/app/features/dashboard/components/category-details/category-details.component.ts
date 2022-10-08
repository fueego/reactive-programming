import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LinkItemData } from 'src/app/core/interface/link.model';
import { Notes } from 'src/app/core/interface/notes.model';

export interface NoteAction {
  action: 'addNote' | 'removeNote';
  link: LinkItemData | null;
  notes: Notes | null;
  newNotes?: string;
}

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailsComponent {
  @Input() linkDetails: LinkItemData | null = null;
  @Input() notes: Notes | null = null;
  @Output() noteEvent = new EventEmitter<NoteAction>();

  noteData = '';

  constructor() {}

  addNote(): void {
    !!this.noteData &&
      this.noteEvent.emit({
        action: 'addNote',
        link: this.linkDetails,
        notes: this.notes,
        newNotes: this.noteData,
      });

    this.noteData = '';
  }

  removeNote(): void {
    this.noteEvent.emit({
      action: 'removeNote',
      notes: this.notes,
      link: this.linkDetails,
    });
  }
}
