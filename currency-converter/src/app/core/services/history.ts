import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConversionHistory } from '../models/conversion-history/conversion-history';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private readonly historySubject =
    new BehaviorSubject<ConversionHistory[]>([]);

  readonly history$ = this.historySubject.asObservable();

  add(entry: ConversionHistory): void {
    const current = this.historySubject.value;
    const updated = [entry, ...current].slice(0, 5);
    this.historySubject.next(updated);
  }
}
