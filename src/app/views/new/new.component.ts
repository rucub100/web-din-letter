import { Component, inject } from '@angular/core';

import { DocumentComponent } from '../../components/document/document.component';
import { ShellComponent } from '../../components/shell/shell.component';
import { DINForm, isDINForm } from '../../models/DINForm';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  imports: [ShellComponent, DocumentComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent {
  private route = inject(ActivatedRoute);

  selectedForm: DINForm = 'B';
  refLine: boolean = false;
  infoBlock: boolean = true;

  constructor() {
    const selectedForm = this.route.snapshot.queryParams['form'];
    if (isDINForm(selectedForm)) {
      this.selectedForm = selectedForm;
    }

    const refLine = this.route.snapshot.queryParams['form'];
    if (refLine === 'true') {
      this.refLine = true;
    }

    const infoBlock = this.route.snapshot.queryParams['form'];
    if (infoBlock === 'true') {
      this.infoBlock = true;
    }
  }
}
