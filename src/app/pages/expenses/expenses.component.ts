import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { GeneralService } from '../../general.service';
import { RouterLink } from '@angular/router';

interface DailyMovements {
  day: string;
  data: {
    amount: number;
    date: string;
    id: string;
    notes: string;
    type: string;
  };
}
@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {
  data$!: Observable<any[]>;

  constructor(private generalService: GeneralService) {
    this.loadData();
  }
  loadData() {
    function getDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      const lastDay = new Date(year, Number(month), 0).getDate();
      return { year, month, day, lastDay };
    }

    const today = getDate();

    this.data$ = this.generalService
      .getExpenses(
        `${today.year}-${today.month}-01`,
        `${today.year}-${today.month}-${today.lastDay}`
      )
      .pipe(
        map((res) => {
          const newArrayMovements: DailyMovements[] = res.reduce(
            (result, item) => {
              const existingItem = result.find(
                (elem: { day: string }) => elem.day === item.date
              );
              if (existingItem) {
                existingItem.data.push(item);
              } else {
                result.push({
                  day: item.date,
                  data: [item],
                });
              }
              return result;
            },
            []
          );
          return newArrayMovements;
        })
      );
  }
}
