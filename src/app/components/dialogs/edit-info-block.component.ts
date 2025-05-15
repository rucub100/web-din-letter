import { Component, inject } from '@angular/core';
import { InfoBlockComponent } from '../forms/info-block.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DINInfoBlock } from '../../models/DINLetter';
import { createInfoBlockFormGroup } from '../forms/form-groups';
import { FormBuilder } from '@angular/forms';
import { info } from 'console';

@Component({
  selector: 'app-edit-info-block',
  imports: [MatDialogModule, InfoBlockComponent, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Informationsblock</h1>
    <mat-dialog-content>
      <app-info-block [formGroup]="infoBlockFormGroup"></app-info-block>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]>Abbrechen</button>
      <button
        mat-button
        [disabled]="infoBlockFormGroup.invalid"
        (click)="apply()"
      >
        Übernehmen
      </button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class EditInfoBlockComponent {
  readonly dialogRef = inject(MatDialogRef<EditInfoBlockComponent>);
  readonly data = inject<DINInfoBlock>(MAT_DIALOG_DATA);

  private _formBuilder = inject(FormBuilder);
  infoBlockFormGroup = createInfoBlockFormGroup(this._formBuilder);

  constructor() {
    if (this.data) {
      this.infoBlockFormGroup.controls.infoBlock.setValue(this.data);
    }
  }

  apply() {
    const result: DINInfoBlock =
      this.infoBlockFormGroup.controls.infoBlock.value;
    this.dialogRef.close(result);
  }
}
