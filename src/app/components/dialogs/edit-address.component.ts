import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { createAddressFormGroup } from '../forms/form-groups';
import { AddressComponent } from '../forms/address.component';
import { DINAddress } from '../../models/DINAddress';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-address',
  imports: [MatDialogModule, AddressComponent, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Adresse</h1>
    <mat-dialog-content>
      <app-address [formGroup]="addressFormGroup"></app-address>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]>Abbrechen</button>
      <button
        mat-button
        [disabled]="addressFormGroup.invalid"
        (click)="apply()"
      >
        Übernehmen
      </button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class EditAddressComponent {
  readonly dialogRef = inject(MatDialogRef<EditAddressComponent>);
  readonly data = inject<DINAddress>(MAT_DIALOG_DATA);

  private _formBuilder = inject(FormBuilder);
  addressFormGroup = createAddressFormGroup(this._formBuilder);

  constructor() {
    if (this.data) {
      if (this.data.senderDetails) {
        this.addressFormGroup.controls.senderDetailsEnabled.setValue(true);
        this.addressFormGroup.controls.senderDetails.setValue(
          this.data.senderDetails
        );
      } else if (this.data.recipientDetails) {
        this.addressFormGroup.controls.senderDetailsEnabled.setValue(false);
      }

      if (this.data.endorsement) {
        this.addressFormGroup.controls.endorsementEnabled.setValue(true);
        this.addressFormGroup.controls.endorsement.setValue(
          this.data.endorsement
        );
      }

      this.addressFormGroup.controls.recipientDetails.setValue(
        this.data.recipientDetails
      );
    }
  }

  apply() {
    const result: DINAddress = {
      senderDetails: this.addressFormGroup.controls.senderDetailsEnabled.value
        ? this.addressFormGroup.controls.senderDetails.value
        : undefined,
      endorsement: this.addressFormGroup.controls.endorsementEnabled.value
        ? this.addressFormGroup.controls.endorsement.value
        : undefined,
      recipientDetails: this.addressFormGroup.controls.recipientDetails.value,
    };

    this.dialogRef.close(result);
  }
}
