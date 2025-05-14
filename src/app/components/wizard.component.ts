import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { getGermanCurrentDate } from '../utils';
import { DINLetter } from '../models/DINLetter';
import { AddressComponent } from './forms/address.component';

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
    AddressComponent,
  ],
  template: `
    <h1 mat-dialog-title>Brief Assistent</h1>
    <mat-dialog-content>
      <mat-stepper orientation="vertical" [linear]="true">
        <!-- Address -->
        <mat-step [stepControl]="addressFormGroup">
          <ng-template matStepLabel>Adresse</ng-template>
          <app-address [formGroup]="addressFormGroup"></app-address>
        </mat-step>
        <!-- Info block -->
        @if (data.showInfoBlock) {
        <mat-step optional="">
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
            <div class="mt-4">
              <button mat-button matStepperPrevious>Zurück</button>
              <button mat-button matStepperNext>Weiter</button>
            </div>
          </form>
        </mat-step>
        }
        <!-- Ref line -->
        @if (data.showRefLine) {
        <mat-step optional>
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
            <div class="mt-4">
              <button mat-button matStepperPrevious>Zurück</button>
              <button mat-button matStepperNext>Weiter</button>
            </div>
          </form>
        </mat-step>
        }
        <!-- Text -->
        <mat-step optional>
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
            <div class="mt-8">
              <button mat-button matStepperPrevious>Zurück</button>
            </div>
          </form>
        </mat-step>
      </mat-stepper>
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
})
export class WizardComponent {
  private _formBuilder = inject(FormBuilder);

  readonly dialogRef = inject(MatDialogRef<WizardComponent>);
  readonly data = inject<WizardDialogData>(MAT_DIALOG_DATA);

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

  apply() {
    const result: Partial<Omit<DINLetter, 'form'>> = {
      address: {
        senderDetails: this.addressFormGroup.controls.senderDetailsEnabled.value
          ? this.addressFormGroup.controls.senderDetails.value
          : undefined,
        endorsement: this.addressFormGroup.controls.endorsementEnabled.value
          ? this.addressFormGroup.controls.endorsement.value
          : undefined,
        recipientDetails: this.addressFormGroup.controls.recipientDetails.value,
      },
    };

    if (this.data.showInfoBlock) {
      result.infoBlock = this.infoBlockFormGroup.controls.infoBlock.value || '';
    }

    if (this.data.showRefLine) {
      result.refLine = {
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
    }

    const text = this._concatText();
    if (text) {
      result.text = text;
    }

    this.dialogRef.close(result);
  }

  private _concatText(): string {
    let text = '';

    if (this.textFormGroup.controls.subject.value) {
      text += this.textFormGroup.controls.subject.value;
      text += '\n\n\n';
    } else {
      text += '[Betreff]';
      text += '\n\n\n';
    }

    if (this.textFormGroup.controls.salutation.value) {
      text += this.textFormGroup.controls.salutation.value;
      if (!this.textFormGroup.controls.salutation.value.endsWith(',')) {
        text += ',';
      }
      text += '\n\n';
    } else {
      text += 'Sehr geehrte Damen und Herren,';
      text += '\n\n';
    }

    if (this.textFormGroup.value) {
      text += '[Text]\n\n';
    }

    if (this.textFormGroup.controls.closing.value) {
      text += this.textFormGroup.controls.closing.value;
      text += '\n\n';
    } else {
      text += 'Mit freundlichen Grüßen';
      text += '\n\n';
    }

    if (this.textFormGroup.controls.company.value) {
      text += this.textFormGroup.controls.company.value;
      text += '\n\n\n\n';
    } else {
      text += '[Bezeichnung des Unternehmens]';
      text += '\n\n\n\n';
    }

    if (this.textFormGroup.controls.signatory.value) {
      text += this.textFormGroup.controls.signatory.value;
      text += '\n\n';
    } else {
      text += '[Unterzeichnerangabe(n)]';
      text += '\n\n';
    }

    if (this.textFormGroup.controls.enclosures.value) {
      text += 'Anlage(n)';
    }

    return text;
  }
}
