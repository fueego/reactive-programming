import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/interface/category.model';

interface DialogData {
  categories$: Observable<Category[]>;
}

@Component({
  selector: 'app-add-new-link',
  templateUrl: './add-new-link.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewLinkComponent {
  addItemFormGroup = this.formBuilder.group({
    categoryId: new FormControl('', Validators.required),
    shortDescription: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
  });

  getControl(name: string): AbstractControl {
    return this.addItemFormGroup.get(name) as AbstractControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNewLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  handleClose(): void {
    this.dialogRef.close(this.addItemFormGroup.value);
  }

  isFormValid(): boolean {
    return this.addItemFormGroup.valid;
  }
}
