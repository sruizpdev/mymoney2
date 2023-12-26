import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneralService } from '../../general.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-total-income',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-income.component.html',
  styleUrl: './total-income.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalIncomeComponent {
  currentDay: string = '';
  firstDayOfMonth: string = '';
  dayFormated: string = '';

  total$!: Observable<number>;

  constructor(private generalService: GeneralService) {
    const date = generalService.getDate();
    this.currentDay = `${date.year}-${date.month}-${date.day}`;
    this.firstDayOfMonth = `${date.year}-${date.month}-01`;
    this.dayFormated = `${date.day}-${date.month}-${date.year}`;

    this.loadData();
  }
  loadData() {
    this.total$ = this.generalService.getTotalIncomes(
      this.firstDayOfMonth,
      this.currentDay
    );

    console.log(this.total$);
  }
}
