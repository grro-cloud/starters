import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Angular is running on Grro</h1>
    <p>
      A static Angular app served by nginx. Edit <code>src/app/home.ts</code> to change this page,
      and <code>src/app/app.routes.ts</code> to add pages.
    </p>
    <button type="button" (click)="count.update((c) => c + 1)">
      Clicked {{ count() }} {{ count() === 1 ? 'time' : 'times' }}
    </button>
  `,
})
export class Home {
  protected readonly count = signal(0);
}
