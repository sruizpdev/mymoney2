import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesComponent {
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
