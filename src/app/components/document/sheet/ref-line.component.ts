import { Component } from '@angular/core';

@Component({
  selector: 'app-ref-line',
  imports: [],
  template: `
    <div
      class="flex flex-row w-auto bg-[var(--mat-sys-surface-container-low)] print:bg-transparent"
    >
      <!-- Ihr Zeichen / Ihre Nachricht vom -->
      <div class="flex flex-col w-[50mm]"></div>
      <!-- Unser Zeichen / Unsere Nachricht vom -->
      <div class="flex flex-col w-[50mm]"></div>
      <!-- Telefon, Name -->
      <div class="flex flex-col w-[50mm]"></div>
      <!-- Datum -->
      <div class="flöex flex-col flex-1">
        <label for="date" class="text-[8pt] block">Datum</label>
        <div id="date" name="date">24.04.2025</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class RefLineComponent {}
