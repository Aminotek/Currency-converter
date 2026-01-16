import { Component } from '@angular/core';
import { ConverterComponent } from "./components/converter/converter";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>EUR / USD Converter</h1>
    <app-converter></app-converter>
  `,
  imports: [ConverterComponent],
})
export class AppComponent {}
