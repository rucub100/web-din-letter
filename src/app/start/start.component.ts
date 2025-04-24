import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type Form = 'A' | 'B';

@Component({
  selector: 'app-start',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent {
  private router = inject(Router);

  private _selectedForm: Form = 'B';
  private _refLine = false;
  private _infoBlock = true;

  constructor() {
    this.router.navigate([], {
      queryParams: {
        form: this.selectedForm,
        refLine: this._refLine,
        infoBlock: this._infoBlock,
      },
      queryParamsHandling: 'merge',
    });
  }

  get selectedForm(): Form {
    return this._selectedForm;
  }
  set selectedForm(value: Form) {
    this._selectedForm = value;
    this.router.navigate([], {
      queryParams: { form: value },
      queryParamsHandling: 'merge',
    });
  }

  get refLine(): boolean {
    return this._refLine;
  }
  set refLine(value: boolean) {
    this._refLine = value;
    this.router.navigate([], {
      queryParams: { refLine: value },
      queryParamsHandling: 'merge',
    });
  }

  get infoBlock(): boolean {
    return this._infoBlock;
  }
  set infoBlock(value: boolean) {
    this._infoBlock = value;
    this.router.navigate([], {
      queryParams: { infoBlock: value },
      queryParamsHandling: 'merge',
    });
  }

  newDocument() {
    this.router.navigate(['new'], {
      queryParamsHandling: 'preserve',
    });
  }

  openDocument() {
    throw new Error('Not implemented');
  }
}
