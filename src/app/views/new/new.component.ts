import { Component, computed, inject, Signal } from '@angular/core';

import { DocumentComponent } from '../../components/document/document.component';
import { ShellComponent } from '../../components/shell/shell.component';
import { DINForm, isDINForm } from '../../models/DINForm';
import { ActivatedRoute, Router } from '@angular/router';
import { LetterService } from '../../services/letter.service';
import { DINRefLine } from '../../models/DINRefLine';

@Component({
  selector: 'app-new',
  imports: [ShellComponent, DocumentComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent {
  private route = inject(ActivatedRoute);
  private letterService = inject(LetterService);

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
    const refLine = this.route.snapshot.queryParams['form'] === 'true';
    if (refLine) {
      this.letterService.setRefLine({
        column1: { label: '', value: '' },
        column2: { label: '', value: '' },
        column3: { label: '', value: '' },
        date: { label: 'Datum', value: new Date().toLocaleDateString() },
      });
    }
  }
}
