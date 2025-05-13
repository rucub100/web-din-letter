import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-shell',
  imports: [MatSidenavModule, MenuComponent],
  template: `
    <mat-sidenav-container class="w-full h-full print:contents!">
      <mat-sidenav
        [fixedInViewport]="true"
        mode="side"
        opened
        class="max-w-max print:hidden!"
      >
        <app-menu></app-menu>
      </mat-sidenav>
      <mat-sidenav-content class="print:contents!">
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
  :host {
    display: block;
    min-height: 100vh;
    height: 100vh;
    max-height: 100vh;
    min-width: 100vw;
    width: 100vw;
    max-width: 100vw;
    overflow: hidden;
}
  `,
})
export class ShellComponent {}
