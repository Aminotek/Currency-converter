import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
  private readonly rateSubject = new BehaviorSubject<number>(1.1);
  readonly rate$ = this.rateSubject.asObservable();

  private readonly forcedRateSubject = new BehaviorSubject<number | null>(null);
  readonly forcedRate$ = this.forcedRateSubject.asObservable();

  constructor() {
    interval(3000).subscribe(() => {
      this.updateRate();
    });
  }

  private updateRate(): void {
    const current = this.rateSubject.value;
    const delta = Math.random() * 0.1 - 0.05;
    const next = Math.max(0.0001, current + delta);

    this.rateSubject.next(Number(next.toFixed(4)));
    this.checkForcedRateValidity();
  }

  setForcedRate(rate: number | null): void {
    this.forcedRateSubject.next(rate);
  }

  getRealRate(): number {
    return this.rateSubject.value;
  }

  private checkForcedRateValidity(): void {
    const forced = this.forcedRateSubject.value;
    if (forced === null) return;

    const real = this.rateSubject.value;
    const deviation = Math.abs(real - forced) / real;

    if (deviation > 0.02) {
      this.forcedRateSubject.next(null);
    }
  }
}
