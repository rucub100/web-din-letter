import { Component, effect, inject, Signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DocumentComponent } from '../components/document/document.component';
import { ShellComponent } from '../components/shell.component';
import { DINForm, isDINForm } from '../models/DINForm';
import { ActivatedRoute } from '@angular/router';
import { LetterService } from '../services/letter.service';
import { DINRefLine } from '../models/DINRefLine';
import {
  WizardComponent,
  WizardDialogData,
} from '../components/wizard.component';
import { DINLetter } from '../models/DINLetter';
import { getGermanCurrentDate, replaceSenderDetailsDelimiters } from '../utils';
import { EditAddressComponent } from '../components/dialogs/edit-address.component';
import { DINAddress } from '../models/DINAddress';

@Component({
  selector: 'app-new',
  imports: [ShellComponent, DocumentComponent],
  template: `
    <app-shell>
      <app-document (editAddress)="editAddress()"></app-document>
    </app-shell>
  `,
})
export class NewComponent {
  private route = inject(ActivatedRoute);
  private letterService = inject(LetterService);
  private dialog = inject(MatDialog);

  selectedForm: Signal<DINForm> = this.letterService.form;
  refLine: Signal<DINRefLine | undefined> = this.letterService.refLine;
  infoBlock: Signal<string | undefined> = this.letterService.infoBlock;

  constructor() {
    const selectedForm = this.route.snapshot.queryParams['form'];
    if (isDINForm(selectedForm)) {
      this.letterService.setForm(selectedForm);
    }

    const infoBlock = this.route.snapshot.queryParams['infoBlock'] === 'true';
    if (infoBlock) {
      this.letterService.setInfoBlock('');
    }
    const refLine = this.route.snapshot.queryParams['refLine'] === 'true';
    if (refLine) {
      this.letterService.setRefLine({
        column1: { label: '', value: '' },
        column2: { label: '', value: '' },
        column3: { label: '', value: '' },
        date: { label: 'Datum', value: getGermanCurrentDate() },
      });
    }

    // TODO: run only if there is no existing new letter instance otherwise load the one from the service
    this.dialog
      .open(WizardComponent, {
        disableClose: true,
        data: {
          showInfoBlock: this.infoBlock() !== undefined,
          showRefLine: this.refLine() !== undefined,
        } as WizardDialogData,
      })
      .afterClosed()
      .subscribe((result: DINLetter | undefined) => {
        if (result) {
          this._applyAddress(result.address);
          this._applyInfoBlock(result.infoBlock);
          this._applyRefLine(result.refLine);
          this._applyText(result.text);
        }
      });
  }

  editAddress(): void {
    this.dialog
      .open(EditAddressComponent, {
        data: this.letterService.address(),
      })
      .afterClosed()
      .subscribe((result: DINAddress | undefined) => {
        if (result) {
          this._applyAddress(result);
        }
      });
  }

  private _applyAddress(address: DINAddress): void {
    if (address) {
      this.letterService.setSenderDetails(
        address.senderDetails &&
          replaceSenderDetailsDelimiters(address.senderDetails)
      );
      this.letterService.setEndorsement(address.endorsement);
      this.letterService.setRecipientDetails(address.recipientDetails);
    }
  }

  private _applyInfoBlock(infoBlock: string | undefined): void {
    if (infoBlock) {
      this.letterService.setInfoBlock(infoBlock);
    }
  }

  private _applyRefLine(refLine: DINRefLine | undefined): void {
    if (refLine) {
      this.letterService.setRefLine(refLine);
    }
  }

  private _applyText(text: string): void {
    this.letterService.setText(text);
  }
}
