import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DINForm } from '../models/DINForm';
import { LetterService } from '../services/letter.service';

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
  template: `
    <div
      class="bg-[var(--mat-sys-surface-container)] shadow-[var(--mat-sys-level2)] rounded-[var(--mat-sys-corner-large)] flex flex-row p-8 gap-8"
    >
      <div class="flex flex-col">
        <!-- DIN A4 -->
        <div
          class="relative w-[280px] h-[396px] bg-[var(--mat-sys-surface-bright)] shadow-[var(--mat-sys-level1)]"
        >
          <!-- Anschriftfeld -->
          <div
            class="absolute left-[9.52%] w-[40.48%] h-[15.15%] bg-[var(--mat-sys-surface-dim)]"
            [ngClass]="{
              'top-[15.15%]': selectedForm === 'B',
              'top-[9.09%]': selectedForm === 'A'
            }"
          ></div>
          <!-- Informationsblock -->
          @if (infoBlock) {
          <div
            class="absolute right-[4.76%] w-[40.48%] h-[13.47%] bg-[var(--mat-sys-surface-dim)]"
            [ngClass]="{
              'top-[16.835%]': selectedForm === 'B',
              'top-[10.77%]': selectedForm === 'A'
            }"
          ></div>
          }
          <!-- Bezugszeichenzeile -->
          @if (refLine) {
          <div
            class="absolute left-[11.9%] right-[4.76%] h-[2.84%] bg-[var(--mat-sys-surface-dim)]"
            [ngClass]="{
              'top-[33.15%]': selectedForm === 'B',
              'top-[27.09%]': selectedForm === 'A'
            }"
          ></div>
          }
          <!-- Textfeld -->
          <div
            class="absolute left-[11.9%] right-[9.52%] bottom-[12.82%] bg-[var(--mat-sys-surface-dim)]"
            [ngClass]="refLine ? {
          'top-[38.85%]': selectedForm === 'B',
          'top-[32.79%]': selectedForm === 'A',
        } : {
          'top-[33.15%]': selectedForm === 'B',
          'top-[27.09%]': selectedForm === 'A'
        }"
          ></div>
          <!-- Fußzeile -->
          <div
            class="absolute left-[11.9%] right-[9.52%] bottom-[2.85%] h-[5.69%] bg-[var(--mat-sys-surface-dim)]"
          ></div>
        </div>
      </div>
      <div class="flex flex-col w-[360px] gap-4">
        <h1 class="text-2xl mb-4">Web DIN Brief</h1>
        <mat-form-field>
          <mat-label>Form</mat-label>
          <mat-select [(value)]="selectedForm">
            <mat-option value="B"
              >B - Mit tiefgestelltem Anschriftfeld</mat-option
            >
            <mat-option value="A"
              >A - Mit hochgestelltem Anschriftfeld</mat-option
            >
          </mat-select>
        </mat-form-field>
        <mat-slide-toggle [(ngModel)]="refLine"
          >Bezugszeichenzeile</mat-slide-toggle
        >
        <mat-slide-toggle [(ngModel)]="infoBlock"
          >Informationsblock</mat-slide-toggle
        >
        <button mat-flat-button class="mt-auto" (click)="newDocument()">
          Neues Dokument
        </button>
        <button mat-stroked-button (click)="openDocument()">
          Dokument öffnen
        </button>
      </div>
    </div>
  `,
})
export class StartComponent {
  private router = inject(Router);
  private _letterService = inject(LetterService);

  private _selectedForm: DINForm = 'B';
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

  get selectedForm(): DINForm {
    return this._selectedForm;
  }
  set selectedForm(value: DINForm) {
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
    this._letterService.reset();
    this.router.navigate(['new'], {
      queryParamsHandling: 'preserve',
    });
  }

  openDocument() {
    throw new Error('Not implemented');
  }
}
