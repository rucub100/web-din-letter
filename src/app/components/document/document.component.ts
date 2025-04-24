import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-document',
  imports: [],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css',
})
export class DocumentComponent {
  @Input() selectedForm: string = 'B';
  @Input() refLine: boolean = false;
  @Input() infoBlock: boolean = true;
}
