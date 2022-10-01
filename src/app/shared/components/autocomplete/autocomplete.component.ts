import { OnDestroy } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/core/interface/category.model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] | null = [];
  @Output() optionSelected = new EventEmitter<Category>();

  myControl = new FormControl<string>('');
  filteredOptions$!: Observable<Category[]>;
  unsubscribe$ = new Subject<void>();

  readonly allCategoriesOption = {
    id: null,
    name: 'Pokaż wszystko',
    description: null,
    color: null,
  };

  ngOnInit() {
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      startWith(''),
      debounceTime(250),
      switchMap((value: string | null) => of(this.filterOptions(value)))
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleFocus(): void {
    // trigger valueChanges and compare against new values from options
    this.myControl.updateValueAndValidity();
  }

  displayFn(selectedCategory: Category): string {
    return selectedCategory.name;
  }

  handleSelection(selected: MatAutocompleteSelectedEvent): void {
    this.optionSelected.emit(selected.option.value);
  }

  private filterOptions(searchVal: string | null): Category[] {
    if (!this.categories?.length) {
      this.categories = [];
    }

    if (typeof searchVal !== 'string') {
      return this.categories;
    }

    return searchVal
      ? this.categories.filter((category) =>
          category.name.toLowerCase().includes(searchVal.toLowerCase())
        )
      : this.categories;
  }
}
