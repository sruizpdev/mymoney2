import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, combineLatest, forkJoin, map, of, zip } from 'rxjs';
import { GeneralService } from '../../general.service';
import { RouterLink } from '@angular/router';
interface DateInfo {
  year: string;
  month: string;
  day: string;
  lastDay: string;
}
interface MonthInfo {
  firstDay: string;
  lastDay: string;
  month: string;
}
interface MonthData {
  expenses: number;
  incomes: number;
  month: string;
  firstDay: string;
  lastDay: string;
}
@Component({
  selector: 'app-saving-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './saving-history.component.html',
  styleUrl: './saving-history.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingHistoryComponent {
  constructor(private generalService: GeneralService) {
    this.getHistory();
  }

  generateDateArray() {
    const startDate = new Date('2023-05-01');
    const currentDate = new Date();

    const dateArray = [];

    for (
      let date = startDate;
      date <= currentDate;
      date.setMonth(date.getMonth() + 1)
    ) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const firstDay = `${year}-${month.toString().padStart(2, '0')}-01`;
      const lastDay = `${year}-${month.toString().padStart(2, '0')}-${new Date(
        year,
        month,
        0
      ).getDate()}`;
      const monthName = new Intl.DateTimeFormat('es-ES', {
        month: 'long',
      }).format(new Date(`${year}-${month.toString().padStart(2, '0')}-01`));

      dateArray.push({
        firstDay: firstDay,
        lastDay: lastDay,
        month: `${monthName} ${year}`,
      });
    }

    return dateArray;
  }

  currentDate: DateInfo = this.generalService.getDate();
  endDate: string = `${this.currentDate.year}-${this.currentDate.month}-${this.currentDate.day}`;

  monthInfoArray: MonthInfo[] = [];
  allByMonthArray!: Observable<MonthData[]>;
  allByMonthArray2!: any[];
  getHistory() {
    this.monthInfoArray = this.generateDateArray();
    console.log(this.monthInfoArray);

    const observables = this.monthInfoArray.map((month) => {
      const expenses$ = this.generalService.getTotalExpenses(
        month.firstDay,
        month.lastDay
      );
      const incomes$ = this.generalService.getTotalIncomes(
        month.firstDay,
        month.lastDay
      );

      return zip(expenses$, incomes$).pipe(
        map(([expenses, incomes]) => ({
          expenses,
          incomes,
          month: month.month,
          firstDay: month.firstDay,
          lastDay: month.lastDay,
        }))
      );
    });
    this.allByMonthArray = zip(observables);
    // this.allByMonthArray2 = [
    //   {
    //     expenses: 5000.44,
    //     incomes: 10000.55,
    //     month: 'Diciembre, 2023',
    //     firstDay: '2023-12-01',
    //     lastDay: '2023-12-31',
    //   },
    //   {
    //     expenses: 5000.44,
    //     incomes: 10000.55,
    //     month: 'Noviembre, 2023',
    //     firstDay: '2023-11-01',
    //     lastDay: '2023-11-30',
    //   },
    //   {
    //     expenses: 5000.44,
    //     incomes: 10000.55,
    //     month: 'Octubre, 2023',
    //     firstDay: '2023-10-01',
    //     lastDay: '2023-10-31',
    //   },
    //   {
    //     expenses: 5000.44,
    //     incomes: 10000.55,
    //     month: 'septiembre, 2023',
    //     firstDay: '2023-09-01',
    //     lastDay: '2023-09-30',
    //   },{
    //     expenses: 5000.44,
    //     incomes: 10000.55,
    //     month: 'Agosto, 2023',
    //     firstDay: '2023-08-01',
    //     lastDay: '2023-08-31',
    //   },
    // ];
  }

  printMonth(firstDay: string, lastDay: string) {
    console.log(firstDay, lastDay);
  }
}
