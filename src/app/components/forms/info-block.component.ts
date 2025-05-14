import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InfoBlockFormGroup } from './form-groups';

@Component({
  selector: 'app-info-block',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="formGroup()" class="flex flex-col min-w-[80mm] mt-2">
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
  `,
  styles: ``,
})
export class InfoBlockComponent {
  formGroup = input.required<InfoBlockFormGroup>();
}
