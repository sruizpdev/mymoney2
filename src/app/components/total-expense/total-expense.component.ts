import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneralService } from '../../general.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-total-expense',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-expense.component.html',
  styleUrl: './total-expense.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalExpenseComponent {
  currentDay: string = '';
  firstDayOfMonth: string = '';
  dayFormated:string=''

  total$!: Observable<number>;

  constructor(private generalService: GeneralService) {
    const date = generalService.getDate();
    this.currentDay = `${date.year}-${date.month}-${date.day}`;
    this.firstDayOfMonth = `${date.year}-${date.month}-01`;
    this.dayFormated = `${date.day}-${date.month}-${date.year}`;

    this.total$ = generalService.getTotalExpenses(
      this.firstDayOfMonth,
      this.currentDay
    );

    console.log(this.total$);
  }
}
