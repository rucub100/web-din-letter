import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
    MatDividerModule,
    MatButtonToggleModule,
  ],
  template: `
    <h1 mat-dialog-title>Brief Assistent</h1>
    <mat-dialog-content>
      <mat-stepper orientation="vertical" [linear]="true" #stepper>
        <!-- Address -->
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
        <!-- Info block -->
        <mat-step>
          <ng-template matStepLabel>Informationsblock</ng-template>
          <form
            [formGroup]="infoBlockFormGroup"
            class="flex flex-col min-w-[80mm]"
          >
            <mat-form-field>
              <textarea
                matInput
                [rows]="9"
                class="resize-none!"
                formControlName="infoBlock"
                placeholder="z.B. Kommunikationszeile und/oder Datum"
              ></textarea>
            </mat-form-field>
          </form>
        </mat-step>
        <!-- Ref line -->
        <mat-step>
          <ng-template matStepLabel>Bezugszeichenzeile</ng-template>
          <form
            [formGroup]="refLineFormGroup"
            class="flex flex-col min-w-[80mm]"
          >
            <div class="flex flex-col py-2">
              <mat-form-field appearance="outline">
                <mat-label>Spalte 1 (Bezeichnung)</mat-label>
                <input
                  matInput
                  formControlName="column1Label"
                  placeholder="z.B. Ihr Zeichen/Ihre Nachricht vom"
                />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Spalte 1 (Wert)</mat-label>
                <input matInput formControlName="column1Value" />
              </mat-form-field>
            </div>
            <div class="flex flex-col py-2">
              <mat-form-field appearance="outline">
                <mat-label>Spalte 2 (Bezeichnung)</mat-label>
                <input
                  matInput
                  formControlName="column2Label"
                  placeholder="z.B. Unser Zeichen/Unsere Nachricht vom"
                />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Spalte 2 (Wert)</mat-label>
                <input matInput formControlName="column2Value" />
              </mat-form-field>
            </div>
            <div class="flex flex-col py-2">
              <mat-form-field appearance="outline">
                <mat-label>Spalte 3 (Bezeichnung)</mat-label>
                <input
                  matInput
                  formControlName="column3Label"
                  placeholder="z.B. Name/Telefon"
                />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Spalte 3 (Wert)</mat-label>
                <input matInput formControlName="column3Value" />
              </mat-form-field>
            </div>
            <div class="flex flex-col py-2">
              <mat-button-toggle-group
                formControlName="dateColumn"
                class="mb-4"
              >
                <mat-button-toggle value="undefined"
                  >Undefiniert</mat-button-toggle
                >
                <mat-button-toggle value="date">Datum</mat-button-toggle>
                <mat-button-toggle value="custom"
                  >Benutzerdefiniert</mat-button-toggle
                >
              </mat-button-toggle-group>
              <mat-form-field appearance="outline">
                <mat-label>Spalte 4 (Bezeichnung)</mat-label>
                <input matInput formControlName="dateLabel" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Spalte 4 (Wert)</mat-label>
                <input matInput formControlName="dateValue" />
              </mat-form-field>
            </div>
          </form>
        </mat-step>
        <!-- Text -->
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
  private _formBuilder = inject(FormBuilder);

  addressFormGroup = this._formBuilder.nonNullable.group({
    senderDetails: [
      { value: '', disabled: false },
      [Validators.required, Validators.maxLength(60)],
    ],
    endorsement: [{ value: '', disabled: true }, Validators.required],
    recipientDetails: [{ value: '', disabled: false }, Validators.required],
  });

  infoBlockFormGroup = this._formBuilder.group({
    infoBlock: [''],
  });

  refLineFormGroup = this._formBuilder.group({
    column1Label: [''],
    column1Value: [''],
    column2Label: [''],
    column2Value: [''],
    column3Label: [''],
    column3Value: [''],
    dateColumn: ['date'],
    dateLabel: [{ value: 'Datum', disabled: true }],
    dateValue: [
      {
        value: new Date().toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        disabled: true,
      },
    ],
  });

  constructor() {
    this.refLineFormGroup.controls.dateColumn.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        switch (value) {
          case 'date':
            this.refLineFormGroup.controls.dateLabel.setValue('Datum');
            this.refLineFormGroup.controls.dateValue.setValue(
              this._getGermanCurrentDate()
            );
            this.refLineFormGroup.controls.dateLabel.disable();
            this.refLineFormGroup.controls.dateValue.disable();
            break;
          case 'custom':
            this.refLineFormGroup.controls.dateLabel.enable();
            this.refLineFormGroup.controls.dateValue.enable();
            break;
          case 'undefined':
          default:
            this.refLineFormGroup.controls.dateLabel.setValue('');
            this.refLineFormGroup.controls.dateValue.setValue('');
            this.refLineFormGroup.controls.dateLabel.disable();
            this.refLineFormGroup.controls.dateValue.disable();
        }
      });
  }

  private _getGermanCurrentDate = () =>
    new Date().toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

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
}
