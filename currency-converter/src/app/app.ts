import { Component } from '@angular/core';
import { ConverterComponent } from "./components/converter/converter";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="app-root">
  <h1>EUR / USD Converter</h1>
  <app-converter></app-converter>
</div>
  `,
  imports: [ConverterComponent],
})
export class AppComponent {}
