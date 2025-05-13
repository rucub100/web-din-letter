import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule],
  template: `
    <div class="flex flex-col h-full px-4 py-8">
      <button mat-icon-button (click)="print()">
        <span class="material-symbols-outlined block!">print</span>
      </button>
    </div>
  `,
  styles: ``,
})
export class MenuComponent {
  print() {
    window.print();
  }
}
