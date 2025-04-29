import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-wizard',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Brief Assistent</h1>
    <mat-dialog-content> TODO </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Abbrechen</button>
      <button mat-button color="secondary">Zurück</button>
      <button mat-button color="primary">Weiter</button>
    </mat-dialog-actions>
  `,
})
export class WizardComponent {}
