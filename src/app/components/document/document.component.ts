import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LetterService } from '../../services/letter.service';

@Component({
  selector: 'app-document',
  imports: [CommonModule],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css',
})
export class DocumentComponent {
  private letterService = inject(LetterService);

  selectedForm = this.letterService.form;
  refLine = this.letterService.refLine;
  infoBlock = this.letterService.infoBlock;
  text = this.letterService.text;

  onTextInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    if (target.scrollHeight > target.clientHeight) {
      console.log('TODO: Text area is overflowing');
    }
    this.letterService.setText(target.value);
  }
}
