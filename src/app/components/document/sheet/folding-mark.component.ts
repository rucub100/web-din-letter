import { Component, computed, input } from '@angular/core';
import { DINForm } from '../../../models/DINForm';

@Component({
  selector: 'app-folding-mark',
  imports: [],
  template: ``,
  styles: `
  :host {
    display: block;
    width: 5mm; 
    height: 0.25mm;
    background-color: var(--mat-sys-on-surface);
  }`,
})
export class FoldingMarkComponent {}
