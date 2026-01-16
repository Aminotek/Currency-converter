import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConversionService {
  convert(
    amount: number,
    rate: number,
    mode: 'EUR' | 'USD'
  ): number {
    if (mode === 'EUR') {
      return amount * rate;
    }
    return amount / rate;
  }
}
