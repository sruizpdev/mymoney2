import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-day-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-transactions.component.html',
  styleUrl: './day-transactions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayTransactionsComponent {
  daily = [
    {
      id: 1,
      amount: 5.5,
      notes: 'Biedronka',
      type: 'paw.png',
    },
    {
      id: 2,
      amount: 25.15,
      notes: 'Biedronka',
      type: 'salary.png',
    },
    {
      id: 3,
      amount: 54.45,
      notes: 'Kaufland',
      type: 'bus-stop.png',
    },
    {
      id: 4,
      amount: 5.45,
      notes: 'Kaufland',
      type: 'sleeping-pills.png',
    },
  ];
}
