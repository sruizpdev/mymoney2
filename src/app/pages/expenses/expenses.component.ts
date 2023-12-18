import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {
  data!: Observable<Array<any>>;

  constructor(private generalService: GeneralService) {
    this.generalService.getAllExpenses().subscribe((res) => {
      console.log(res);
    });
  }
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
