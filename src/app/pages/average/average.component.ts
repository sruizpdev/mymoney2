import { GeneralService } from './../../general.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-average',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './average.component.html',
  styleUrl: './average.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AverageComponent {
  total$!: Observable<number>;
  totalExpenses$!: Observable<number>;
  totalIncomes$!: Observable<number>;

  currentDay!: string;
  firstDay!: string;
  dayFormated!: string;
  lastDay!: string;
  average: number=0;
  maxValue!: number;
  remaining!: number;
  valueBar: number = 0.00; // Valor inicial de la barra
  daysLeft!: number;

  calcAverage(): void {
    this.average = (this.maxValue - this.valueBar) / this.daysLeft;
  }

  constructor(private generalService: GeneralService) {
    this.loadData();
  }

  loadData() {
    const date = this.generalService.getDate();
    this.currentDay = `${date.year}-${date.month}-${date.day}`;
    this.firstDay = `${date.year}-${date.month}-01`;
    this.dayFormated = `${date.day}-${date.month}-${date.year}`;

    this.lastDay = date.lastDay;
    this.totalExpenses$ = this.generalService.getTotalExpenses(
      this.firstDay,
      this.currentDay
    );
    this.totalIncomes$ = this.generalService.getTotalIncomes(
      this.firstDay,
      this.currentDay
    );

    this.total$ = combineLatest([this.totalIncomes$, this.totalExpenses$]).pipe(
      map(
        ([totalIncomes, totalExpenses]) =>
          +(totalIncomes - totalExpenses).toFixed(2)
      )
    );
    this.total$.subscribe((value: number) => {
      this.maxValue = value;
    });

    this.daysLeft =
      Number(this.generalService.getDate().lastDay) -
      Number(this.generalService.getDate().day);
  }
}
