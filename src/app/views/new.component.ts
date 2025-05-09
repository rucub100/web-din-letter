import { Component, inject, OnInit, Signal, TemplateRef } from '@angular/core';

import { DocumentComponent } from '../components/document/document.component';
import { ShellComponent } from '../components/shell.component';
import { DINForm, isDINForm } from '../models/DINForm';
import { ActivatedRoute } from '@angular/router';
import { LetterService } from '../services/letter.service';
import { DINRefLine } from '../models/DINRefLine';
import { MatDialog } from '@angular/material/dialog';
import {
  WizardComponent,
  WizardDialogData,
} from '../components/wizard.component';
import { DINLetter } from '../models/DINLetter';
import { replaceSenderDetailsDelimiters } from '../utils';

@Component({
  selector: 'app-new',
  imports: [ShellComponent, DocumentComponent],
  template: `
    <app-shell>
      <app-document></app-document>
    </app-shell>
  `,
})
export class NewComponent implements OnInit {
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
        date: { label: 'Datum', value: new Date().toLocaleDateString() },
      });
    }
  }

  ngOnInit(): void {
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
          if (result.address) {
            if (result.address.senderDetails) {
              this.letterService.setSenderDetails(
                replaceSenderDetailsDelimiters(result.address.senderDetails)
              );
            }
            if (result.address.endorsement) {
              this.letterService.setEndorsement(result.address.endorsement);
            }
            this.letterService.setRecipientDetails(
              result.address.recipientDetails
            );
          }
        }
      });
  }
}
