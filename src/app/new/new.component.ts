import { Component } from '@angular/core';
import { ShellComponent } from '../shell/shell.component';

@Component({
  selector: 'app-new',
  imports: [ShellComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent {}
