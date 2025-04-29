import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DINForm } from '../../../models/DINForm';
import { DINAddress } from '../../../models/DINAddress';
import { DINRefLine } from '../../../models/DINRefLine';
import { DINInfoBlock } from '../../../models/DINLetter';
import { FoldingMarkComponent } from './folding-mark.component';
import { HoleMarkComponent } from './hole-mark.component';
import { AddressFieldComponent } from './address-field.component';
import { InfoBlockComponent } from './info-block.component';
import { RefLineComponent } from './ref-line.component';
import { TextFieldComponent } from './text-field.component';
import { PageNumberingComponent } from './page-numbering.component';

@Component({
  selector: 'app-sheet',
  imports: [
    CommonModule,
    FoldingMarkComponent,
    HoleMarkComponent,
    AddressFieldComponent,
    InfoBlockComponent,
    RefLineComponent,
    TextFieldComponent,
    PageNumberingComponent,
  ],
  template: `
    <div
      class="flex flex-col w-[210mm] h-[297mm] bg-[var(--mat-sys-surface)] print:bg-transparent shadow-[var(--mat-sys-level1)] print:shadow-none text-[12pt] leading-none print:break-after-page print:break-inside-avoid relative"
    >
      <!-- Faltmarke 1 -->
      <app-folding-mark
        class="absolute left-[5mm]"
        [ngClass]="{
          'top-[105mm]': form() === 'B',
          'top-[87mm]': form() === 'A'
        }"
      ></app-folding-mark>
      <!-- Faltmarke 2 -->
      <app-folding-mark
        class="absolute left-[5mm]"
        [ngClass]="{
          'bottom-[87mm]': form() === 'B',
          'bottom-[105mm]': form() === 'A'
        }"
      ></app-folding-mark>
      <!-- Lochmarke -->
      <app-hole-mark class="absolute top-[148.5mm] left-[5mm]"></app-hole-mark>

      <div
        class="flex flex-row ml-[20mm] gap-[20mm]"
        [ngClass]="{
          'mt-[45mm]': form() === 'B',
          'mt-[27mm]': form() === 'A'
        }"
      >
        <!-- Anschriftfeld -->
        <app-address-field [address]="address()"></app-address-field>
        <!-- Informationsblock -->
        <app-info-block
          [infoBlock]="infoBlock()"
          class="mt-[5mm]"
        ></app-info-block>
      </div>

      <!-- Bezugszeichenzeile -->
      @if (refLine() !== undefined) {
      <app-ref-line class="ml-[25mm] mr-[10mm] mt-[24pt]"></app-ref-line>
      }

      <!-- Textfeld -->
      <app-text-field
        [text]="text()"
        (textChanged)="(textChanged)"
        class="ml-[25mm] mr-[20mm] mt-[24pt] mb-[12pt] flex-1"
      ></app-text-field>
      <!-- Seitenzahl -->
      <app-page-numbering class="ml-[25mm] mr-[20mm]"></app-page-numbering>
      <!-- Fußzeile -->
      @if(false) {
      <div
        class="mt-[12pt] mb-[24pt] ml-[25mm] mr-[20mm] w-auto h-[48pt] bg-[var(--mat-sys-surface-container-low)] print:bg-transparent"
      ></div>
      } @else {
      <div class="mt-[24pt]"></div>
      }
    </div>
  `,
})
export class SheetComponent {
  form = input.required<DINForm>();
  address = input.required<DINAddress>();
  refLine = input.required<DINRefLine | undefined>();
  infoBlock = input.required<DINInfoBlock | undefined>();
  text = input.required<string>();
  textChanged = output<string>();
}
