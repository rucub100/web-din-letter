import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { LetterService } from '../../services/letter.service';
import { SheetComponent } from './sheet/sheet.component';

@Component({
  selector: 'app-document',
  imports: [CommonModule, SheetComponent],
  template: `
    <div
      class="w-full h-full flex flex-col items-center bg-[var(--mat-sys-surface-container)] py-16 overflow-y-auto print:contents!"
    >
      <app-sheet
        [form]="selectedForm()"
        [address]="address()"
        (clickAddress)="editAddress.emit()"
        [infoBlock]="infoBlock()"
        [refLine]="refLine()"
        [text]="text()"
        (textChanged)="onTextInput($event)"
      ></app-sheet>
    </div>
  `,
})
export class DocumentComponent {
  editAddress = output();

  private letterService = inject(LetterService);

  selectedForm = this.letterService.form;
  address = this.letterService.address;
  refLine = this.letterService.refLine;
  infoBlock = this.letterService.infoBlock;
  text = this.letterService.text;

  onTextInput(text: string) {
    this.letterService.setText(text);
  }
}
