import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-text-field',
  imports: [],
  template: `
    <div class="w-full h-full bg-[rgba(127,127,127,0.04)] print:bg-transparent">
      <!-- TODO: change to div with contenteditable=true for rich text -->
      <textarea
        name="text"
        id="text"
        class="w-full h-full resize-none overflow-hidden outline-offset-4"
        [value]="text()"
        (input)="onTextInput($event)"
      ></textarea>
    </div>
  `,
})
export class TextFieldComponent {
  text = input.required<string>();
  textChanged = output<string>();

  onTextInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    if (target.scrollHeight > target.clientHeight) {
      console.log('TODO: Text area is overflowing');
    }

    this.textChanged.emit(target.value);
  }
}
