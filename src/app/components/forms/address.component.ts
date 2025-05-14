import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
      <div class="mt-4">
        <button mat-button matStepperNext>Weiter</button>
      </div>
    </form>
  `,
  styles: ``,
})
export class AddressComponent {
  formGroup = input.required<
    FormGroup<{
      senderDetailsEnabled: FormControl<boolean>;
      senderDetails: FormControl<string>;
      endorsementEnabled: FormControl<boolean>;
      endorsement: FormControl<string>;
      recipientDetails: FormControl<string>;
    }>
  >();

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
