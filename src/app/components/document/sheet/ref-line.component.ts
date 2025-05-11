import { Component, input } from '@angular/core';
import { DINRefLine } from '../../../models/DINRefLine';

@Component({
  selector: 'app-ref-line',
  imports: [],
  template: `
    <div
      class="flex flex-row w-auto bg-[rgba(127,127,127,0.04)] print:bg-transparent"
    >
      <!-- Ihr Zeichen / Ihre Nachricht vom -->
      <div class="flex flex-col w-[50mm]">
        <label for="column1" class="text-[8pt] block">{{
          refLine().column1.label
        }}</label>
        <div id="column1" name="column1">{{ refLine().column1.value }}</div>
      </div>
      <!-- Unser Zeichen / Unsere Nachricht vom -->
      <div class="flex flex-col w-[50mm]">
        <label for="column2" class="text-[8pt] block">{{
          refLine().column2.label
        }}</label>
        <div id="column2" name="column2">{{ refLine().column2.value }}</div>
      </div>
      <!-- Telefon, Name -->
      <div class="flex flex-col w-[50mm]">
        <label for="column3" class="text-[8pt] block">{{
          refLine().column3.label
        }}</label>
        <div id="column3" name="column3">{{ refLine().column3.value }}</div>
      </div>
      <!-- Datum -->
      <div class="flex flex-col flex-1">
        <label for="date" class="text-[8pt] block">{{
          refLine().date.label
        }}</label>
        <div id="date" name="date">{{ refLine().date.value }}</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class RefLineComponent {
  refLine = input.required<DINRefLine>();
}
