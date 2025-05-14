import { Component, DestroyRef, effect, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AddressFormGroup } from './form-groups';

@Component({
  selector: 'app-address',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  template: `
    <form [formGroup]="formGroup()" class="flex flex-col min-w-[80mm] mt-2">
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
        @if (formGroup().controls.senderDetails.hasError('maxlength')) {
        <mat-error>Die Zeile ist zu lang</mat-error>
        } @else {
        <mat-hint>Trennzeichen: '-'</mat-hint>
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
      <ng-content></ng-content>
    </form>
  `,
  styles: ``,
})
export class AddressComponent {
  formGroup = input.required<AddressFormGroup>();

  constructor(private destroyRef: DestroyRef) {
    effect(() => {
      const formGroup = this.formGroup();
      formGroup.controls.senderDetailsEnabled.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          if (value) {
            formGroup.controls.senderDetails.enable();
          } else {
            formGroup.controls.senderDetails.disable();
          }
        });

      formGroup.controls.endorsementEnabled.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          if (value) {
            formGroup.controls.endorsement.enable();
          } else {
            formGroup.controls.endorsement.disable();
          }
        });
    });
  }
}
