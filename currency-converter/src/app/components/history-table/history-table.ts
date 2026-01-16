import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../../core/services/history';
@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-table.html',
})
export class HistoryTableComponent {
  history$;

 constructor(private historyService: HistoryService) {
    this.history$ = this.historyService.history$;
  }
}
