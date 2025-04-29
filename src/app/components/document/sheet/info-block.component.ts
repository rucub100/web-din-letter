import { Component, computed, input } from '@angular/core';
import { DINInfoBlock } from '../../../models/DINLetter';

@Component({
  selector: 'app-info-block',
  imports: [],
  template: `
    <div
      class="w-[75mm] min-h-[40mm] bg-[var(--mat-sys-surface-container-low)] print:bg-transparent flex flex-col-reverse"
    >
      @for(line of infoBlockLines(); track line) {
      <span>{{ line }}</span>
      }
    </div>
  `,
})
export class InfoBlockComponent {
  infoBlock = input.required<DINInfoBlock | undefined>();
  infoBlockLines = computed(() => this.infoBlock()?.split('\n') ?? []);
}
