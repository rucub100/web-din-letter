import {
  Component,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-text-field',
  imports: [],
  template: `
    <div class="w-full h-full bg-[rgba(127,127,127,0.04)] print:bg-transparent">
      <div
        contenteditable
        #textDiv
        name="text"
        id="text"
        role="textbox"
        class="w-full h-full resize-none overflow-hidden outline-offset-4"
        (input)="onTextInput($event)"
      ></div>
    </div>
  `,
})
export class TextFieldComponent {
  text = input.required<string>();
  textChanged = output<string>();

  private textDiv = viewChild.required<ElementRef<HTMLDivElement>>('textDiv');

  constructor() {
    effect(() => {
      const text = this.text();
      const textDiv = this.textDiv();

      // update the text content only if it has changed (prevents cursor jump)
      if (textDiv.nativeElement.innerHTML !== text) {
        textDiv.nativeElement.innerHTML = text;
      }
    });
  }

  onTextInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    if (target.scrollHeight > target.clientHeight) {
      console.log('TODO: Text area is overflowing');
    }

    this.textChanged.emit(target.innerHTML);
  }
}
