import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DINAddress } from '../models/DINAddress';

@Component({
  selector: 'app-wizard',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  template: `
    <h1 mat-dialog-title>Brief Assistent</h1>
    <mat-dialog-content>
      <mat-stepper orientation="vertical" [linear]="true" #stepper>
        <mat-step [stepControl]="addressFormGroup">
          <ng-template matStepLabel>Adresse</ng-template>
          <form
            [formGroup]="addressFormGroup"
            class="flex flex-col min-w-[80mm]"
          >
            <mat-slide-toggle
              class="mb-4"
              [checked]="!addressFormGroup.controls.senderDetails.disabled"
              (toggleChange)="
                setSenderDetailsDisabled(
                  !addressFormGroup.controls.senderDetails.disabled
                )
              "
            ></mat-slide-toggle>
            <mat-form-field appearance="outline">
              <mat-label>Rücksendeangabe</mat-label>
              <input
                matInput
                placeholder="Klaus Fischer • Am Bahnhof 5 • 20095 Hamburg"
                formControlName="senderDetails"
              />
              @if
              (addressFormGroup.controls.senderDetails.hasError('maxlength')) {
              <mat-error>Die Zeile ist zu lang</mat-error>
              }
            </mat-form-field>

            <mat-slide-toggle
              class="my-4"
              [checked]="!addressFormGroup.controls.endorsement.disabled"
              (toggleChange)="
                setEndorsementDisabled(
                  !addressFormGroup.controls.endorsement.disabled
                )
              "
            ></mat-slide-toggle>
            <mat-form-field appearance="outline">
              <mat-label>Zusatz- und Vermerkzone</mat-label>
              <textarea
                matInput
                [rows]="3"
                class="resize-none!"
                formControlName="endorsement"
              ></textarea>
            </mat-form-field>
            <mat-form-field>
              <mat-label>Anschriftzone</mat-label>
              <textarea
                matInput
                [rows]="6"
                class="resize-none!"
                formControlName="recipientDetails"
              ></textarea>
            </mat-form-field>
          </form>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>Informationsblock</ng-template>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>Bezugszeichenzeile</ng-template>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>Text</ng-template>
        </mat-step>
      </mat-stepper>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Abbrechen</button>
      <button mat-button (click)="stepper.previous()" color="secondary">
        Zurück
      </button>
      <button mat-button (click)="stepper.next()" color="primary">
        Weiter
      </button>
    </mat-dialog-actions>
  `,
})
export class WizardComponent {
  setSenderDetailsDisabled(disable: boolean) {
    if (disable) {
      this.addressFormGroup.controls.senderDetails.disable();
    } else {
      this.addressFormGroup.controls.senderDetails.enable();
    }
  }

  setEndorsementDisabled(disable: boolean) {
    if (disable) {
      this.addressFormGroup.controls.endorsement.disable();
    } else {
      this.addressFormGroup.controls.endorsement.enable();
    }
  }

  private _formBuilder = inject(FormBuilder);

  addressFormGroup = this._formBuilder.nonNullable.group({
    senderDetails: [
      { value: '', disabled: false },
      [Validators.required, Validators.maxLength(60)],
    ],
    endorsement: [{ value: '', disabled: true }, Validators.required],
    recipientDetails: [{ value: '', disabled: false }, Validators.required],
  });
}
