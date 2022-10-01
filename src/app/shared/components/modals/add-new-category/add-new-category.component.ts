import { Color } from '@angular-material-components/color-picker';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewCategoryComponent {
  public color: ThemePalette = 'primary';
  addCategoryFormGroup = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    color: new FormControl<Color | undefined>(undefined, Validators.required),
  });

  getControl(name: string): AbstractControl {
    return this.addCategoryFormGroup.get(name) as AbstractControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNewCategoryComponent>
  ) {}

  handleClose(): void {
    this.dialogRef.close(this.addCategoryFormGroup.value);
  }

  isFormValid(): boolean {
    return this.addCategoryFormGroup.valid;
  }
}
