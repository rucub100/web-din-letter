import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-wizard',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css',
})
export class WizardComponent {}
