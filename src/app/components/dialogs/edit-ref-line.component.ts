import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { RefLineComponent } from '../forms/ref-line.component';
import { DINRefLine } from '../../models/DINRefLine';
import { FormBuilder } from '@angular/forms';
import { createRefLineFormGroup } from '../forms/form-groups';
import { DefaultTitleStrategy } from '@angular/router';
import { getGermanCurrentDate } from '../../utils';

@Component({
  selector: 'app-edit-ref-line',
  imports: [MatDialogModule, RefLineComponent, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Bezugszeichenzeile</h1>
    <mat-dialog-content>
      <app-ref-line [formGroup]="refLineFormGroup"></app-ref-line>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]>Abbrechen</button>
      <button
        mat-button
        [disabled]="refLineFormGroup.invalid"
        (click)="apply()"
      >
        Übernehmen
      </button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class EditRefLineComponent {
  readonly dialogRef = inject(MatDialogRef<EditRefLineComponent>);
  readonly data = inject<DINRefLine>(MAT_DIALOG_DATA);

  private _formBuilder = inject(FormBuilder);
  refLineFormGroup = createRefLineFormGroup(this._formBuilder);

  constructor() {
    if (this.data) {
      const dateLabel = this.data.date.label;
      const dateValue = this.data.date.value;
      const dateColumn =
        dateLabel === 'Datum' && dateValue === getGermanCurrentDate()
          ? 'date'
          : 'custom';

      this.refLineFormGroup.setValue({
        column1Label: this.data.column1.label,
        column1Value: this.data.column1.value,
        column2Label: this.data.column2.label,
        column2Value: this.data.column2.value,
        column3Label: this.data.column3.label,
        column3Value: this.data.column3.value,
        dateColumn,
        dateLabel,
        dateValue,
      });

      if (dateColumn === 'custom') {
        this.refLineFormGroup.controls.dateLabel.disable();
        this.refLineFormGroup.controls.dateValue.disable();
      }
    }
  }

  apply() {
    const result: DINRefLine = {
      column1: {
        label: this.refLineFormGroup.controls.column1Label.value || '',
        value: this.refLineFormGroup.controls.column1Value.value || '',
      },
      column2: {
        label: this.refLineFormGroup.controls.column2Label.value || '',
        value: this.refLineFormGroup.controls.column2Value.value || '',
      },
      column3: {
        label: this.refLineFormGroup.controls.column3Label.value || '',
        value: this.refLineFormGroup.controls.column3Value.value || '',
      },
      date: {
        label: this.refLineFormGroup.controls.dateLabel.value || '',
        value: this.refLineFormGroup.controls.dateValue.value || '',
      },
    };

    this.dialogRef.close(result);
  }
}
