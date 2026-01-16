import { Component, computed, effect, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { ExchangeRateService } from '../../core/services/exchange-rate';
import { ConversionService } from '../../core/services/conversion';
import { HistoryService } from '../../core/services/history';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HistoryTableComponent } from '../history-table/history-table';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HistoryTableComponent],
  templateUrl: './converter.html',
})
export class ConverterComponent {
  realRate$!: Observable<number>;
forcedRate$!: Observable<number | null>;
  mode = signal<'EUR' | 'USD'>('EUR');

  inputControl = new FormControl<number>(0);
  output = signal<number>(0);

  forcedRateForm = new FormGroup({
    enabled: new FormControl<boolean>(false),
    rate: new FormControl<number | null>(null),
  });

  forcedDisabledByDeviation = signal(false);

  constructor(
    private rateService: ExchangeRateService,
    private conversionService: ConversionService,
    private historyService: HistoryService
  ) {
     this.realRate$ = this.rateService.rate$;
  this.forcedRate$ = this.rateService.forcedRate$;
    combineLatest([
  this.rateService.rate$,
  this.rateService.forcedRate$,
  this.inputControl.valueChanges,
]).subscribe(([realRate, forcedRate, amount]) => {
  if (amount === null) return;

  const rate = forcedRate ?? realRate;

  if (
    this.forcedRateForm.value.enabled &&
    forcedRate === null
  ) {
    this.forcedDisabledByDeviation.set(true);
    this.forcedRateForm.patchValue(
      { enabled: false },
      { emitEvent: false }
    );
  } else {
    this.forcedDisabledByDeviation.set(false);
  }

  const result = this.conversionService.convert(
    amount,
    rate,
    this.mode()
  );

  this.output.set(Number(result.toFixed(2)));

  this.historyService.add({
  timestamp: new Date(),

  realRate,
  forcedRate,

  inputAmount: amount,
  inputCurrency: this.mode(),

  outputAmount: this.output(),
  outputCurrency: this.mode() === 'EUR' ? 'USD' : 'EUR',
});

});


  }

  switchMode(): void {
    const newMode = this.mode() === 'EUR' ? 'USD' : 'EUR';
    this.mode.set(newMode);

    this.inputControl.setValue(this.output(), {
      emitEvent: true,
    });
  }


}
