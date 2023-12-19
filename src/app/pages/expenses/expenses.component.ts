import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../../general.service';

interface Item {
  id: string;
  amount: number;
  date: string;
  notes: string;
  type: string;
}
@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {
  data: Observable<Array<any>>;

  constructor(private generalService: GeneralService) {
    this.data = generalService.getAllExpenses();
  }
}
