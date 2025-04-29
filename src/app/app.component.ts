import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div
      class="print:contents w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  title = 'web-din-letter';
}
