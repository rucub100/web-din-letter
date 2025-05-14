import { Component, DestroyRef, effect, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { RefLineFormGroup } from './form-groups';
import { getGermanCurrentDate } from '../../utils';

@Component({
  selector: 'app-ref-line',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  template: `
    <form [formGroup]="formGroup()" class="flex flex-col min-w-[80mm] mt-2">
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
        <mat-button-toggle-group formControlName="dateColumn" class="mb-4">
          <mat-button-toggle value="undefined">Undefiniert</mat-button-toggle>
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
      <ng-content></ng-content>
    </form>
  `,
  styles: ``,
})
export class RefLineComponent {
  formGroup = input.required<RefLineFormGroup>();

  constructor(private destroyRef: DestroyRef) {
    effect(() => {
      const formGroup = this.formGroup();
      formGroup.controls.dateColumn.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          switch (value) {
            case 'date':
              formGroup.controls.dateLabel.setValue('Datum');
              formGroup.controls.dateValue.setValue(getGermanCurrentDate());
              formGroup.controls.dateLabel.disable();
              formGroup.controls.dateValue.disable();
              break;
            case 'custom':
              formGroup.controls.dateLabel.enable();
              formGroup.controls.dateValue.enable();
              break;
            case 'undefined':
            default:
              formGroup.controls.dateLabel.setValue('');
              formGroup.controls.dateValue.setValue('');
              formGroup.controls.dateLabel.disable();
              formGroup.controls.dateValue.disable();
          }
        });
    });
  }
}
