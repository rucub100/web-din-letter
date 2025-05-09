import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { getGermanCurrentDate } from '../utils';

export interface WizardDialogData {
  showInfoBlock?: boolean;
  showRefLine?: boolean;
}

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
      <mat-stepper orientation="vertical" [linear]="false" #stepper>
        <!-- Address -->
        <mat-step [stepControl]="addressFormGroup">
          <ng-template matStepLabel>Adresse</ng-template>
          <form
            [formGroup]="addressFormGroup"
            class="flex flex-col min-w-[80mm] mt-2"
          >
            <mat-slide-toggle
              formControlName="senderDetailsEnabled"
              class="mb-4"
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
              formControlName="endorsementEnabled"
              class="my-4"
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
        @if (data.showInfoBlock) {
        <mat-step>
          <ng-template matStepLabel>Informationsblock</ng-template>
          <form
            [formGroup]="infoBlockFormGroup"
            class="flex flex-col min-w-[80mm] mt-2"
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
        }
        <!-- Ref line -->
        @if (data.showRefLine) {
        <mat-step>
          <ng-template matStepLabel>Bezugszeichenzeile</ng-template>
          <form
            [formGroup]="refLineFormGroup"
            class="flex flex-col min-w-[80mm] mt-2"
          >
            <div class="flex flex-col pb-2">
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
            <div class="flex flex-col pb-2">
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
            <div class="flex flex-col pb-2">
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
            <div class="flex flex-col">
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
        }
        <!-- Text -->
        <mat-step>
          <ng-template matStepLabel>Text</ng-template>
          <form
            [formGroup]="textFormGroup"
            class="flex flex-col min-w-[80mm] mt-2"
          >
            <div class="flex flex-col pb-2">
              <mat-slide-toggle formControlName="subjectBold" class="mb-4"
                >Fett</mat-slide-toggle
              >
              <mat-form-field appearance="outline">
                <mat-label>Betreff</mat-label>
                <input
                  matInput
                  formControlName="subject"
                  placeholder="z.B. Kündigung"
                />
              </mat-form-field>
            </div>
            <mat-form-field appearance="outline" class="mb-2">
              <mat-label>Anrede</mat-label>
              <input
                matInput
                formControlName="salutation"
                placeholder="z.B. Sehr geehrte Damen und Herren,"
              />
            </mat-form-field>
            <mat-form-field appearance="outline" class="mb-2">
              <mat-label>Grußformel</mat-label>
              <input
                matInput
                formControlName="closing"
                placeholder="z.B. Mit freundlichen Grüßen"
              />
            </mat-form-field>
            <mat-form-field appearance="outline" class="mb-2">
              <mat-label>Bezeichnung des Unternehmens</mat-label>
              <input
                matInput
                formControlName="company"
                placeholder="z.B. Müller GmbH"
              />
            </mat-form-field>
            <mat-form-field appearance="outline" class="mb-2">
              <mat-label>Unterzeichnerangabe</mat-label>
              <input
                matInput
                formControlName="signatory"
                placeholder="z.B. Stefan Müller"
              />
            </mat-form-field>
            <mat-slide-toggle formControlName="enclosures"
              >Anlage(n)</mat-slide-toggle
            >
          </form>
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

  data = inject<WizardDialogData>(MAT_DIALOG_DATA);

  addressFormGroup = this._formBuilder.nonNullable.group({
    senderDetailsEnabled: [true],
    senderDetails: [
      { value: '', disabled: false },
      [Validators.required, Validators.maxLength(60)],
    ],
    endorsementEnabled: [false],
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

  textFormGroup = this._formBuilder.group({
    subject: [''],
    subjectBold: [false],
    salutation: [''],
    closing: [''],
    company: [''],
    signatory: [''],
    enclosures: [false],
  });

  constructor() {
    this.addressFormGroup.controls.senderDetailsEnabled.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (value) {
          this.addressFormGroup.controls.senderDetails.enable();
        } else {
          this.addressFormGroup.controls.senderDetails.disable();
        }
      });

    this.addressFormGroup.controls.endorsementEnabled.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (value) {
          this.addressFormGroup.controls.endorsement.enable();
        } else {
          this.addressFormGroup.controls.endorsement.disable();
        }
      });

    this.refLineFormGroup.controls.dateColumn.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        switch (value) {
          case 'date':
            this.refLineFormGroup.controls.dateLabel.setValue('Datum');
            this.refLineFormGroup.controls.dateValue.setValue(
              getGermanCurrentDate()
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
}
