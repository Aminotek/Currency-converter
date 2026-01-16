export interface ConversionHistory {
  timestamp: Date;

  realRate: number;
  forcedRate: number | null;

  inputAmount: number;
  inputCurrency: 'EUR' | 'USD';

  outputAmount: number;
  outputCurrency: 'EUR' | 'USD';
}
