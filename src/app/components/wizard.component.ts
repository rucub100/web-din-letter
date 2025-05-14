import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { AddressComponent } from './forms/address.component';
import { InfoBlockComponent } from './forms/info-block.component';
import { RefLineComponent } from './forms/ref-line.component';
import {
  createAddressFormGroup,
  createInfoBlockFormGroup,
  createRefLineFormGroup,
  createTextFormGroup,
} from './forms/form-groups';
import { DINLetter } from '../models/DINLetter';

export interface WizardDialogData {
  showInfoBlock?: boolean;
  showRefLine?: boolean;
}

@Component({
  selector: 'app-wizard',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    AddressComponent,
    InfoBlockComponent,
    RefLineComponent,
  ],
  template: `
    <h1 mat-dialog-title>Brief Assistent</h1>
    <mat-dialog-content>
      <mat-stepper orientation="vertical" [linear]="true">
        <!-- Address -->
        <mat-step [stepControl]="addressFormGroup">
          <ng-template matStepLabel>Adresse</ng-template>
          <app-address [formGroup]="addressFormGroup">
            <div class="mt-4">
              <button
                mat-button
                matStepperNext
                [disabled]="addressFormGroup.invalid"
              >
                Weiter
              </button>
            </div>
          </app-address>
        </mat-step>
        <!-- Info block -->
        @if (data.showInfoBlock) {
        <mat-step optional>
          <ng-template matStepLabel>Informationsblock</ng-template>
          <app-info-block [formGroup]="infoBlockFormGroup">
            <div class="mt-4">
              <button mat-button matStepperPrevious>Zurück</button>
              <button mat-button matStepperNext>Weiter</button>
            </div>
          </app-info-block>
        </mat-step>
        }
        <!-- Ref line -->
        @if (data.showRefLine) {
        <mat-step optional>
          <ng-template matStepLabel>Bezugszeichenzeile</ng-template>
          <app-ref-line [formGroup]="refLineFormGroup">
            <div class="mt-4">
              <button mat-button matStepperPrevious>Zurück</button>
              <button mat-button matStepperNext>Weiter</button>
            </div>
          </app-ref-line>
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
  readonly dialogRef = inject(MatDialogRef<WizardComponent>);
  readonly data = inject<WizardDialogData>(MAT_DIALOG_DATA);

  private _formBuilder = inject(FormBuilder);
  addressFormGroup = createAddressFormGroup(this._formBuilder);
  infoBlockFormGroup = createInfoBlockFormGroup(this._formBuilder);
  refLineFormGroup = createRefLineFormGroup(this._formBuilder);
  textFormGroup = createTextFormGroup(this._formBuilder);

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
