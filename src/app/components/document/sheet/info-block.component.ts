import { Component, computed, input } from '@angular/core';
import { DINInfoBlock } from '../../../models/DINLetter';

@Component({
  selector: 'app-info-block',
  imports: [],
  template: `
    <div
      class="w-[75mm] min-h-[40mm] bg-[rgba(127,127,127,0.04)] print:bg-transparent flex flex-col-reverse"
    >
      @for(line of infoBlockLines().reverse(); track line) {
      <span>{{ line }}</span>
      }
    </div>
  `,
})
export class InfoBlockComponent {
  infoBlock = input.required<DINInfoBlock | undefined>();
  infoBlockLines = computed(() => this.infoBlock()?.split('\n') ?? []);
}
