import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneralService } from '../../general.service';
import { Observable, combineLatest, map, of } from 'rxjs';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent {
  currentDay: string = '';
  firstDayOfMonth: string = '';
  dayFormated: string = '';

  total$!: Observable<number>;
  totalExpenses$!: Observable<number>;
  totalIncomes$!: Observable<number>;

  constructor(private generalService: GeneralService) {
    const date = generalService.getDate();
    this.currentDay = `${date.year}-${date.month}-${date.day}`;
    this.firstDayOfMonth = `${date.year}-${date.month}-01`;
    this.dayFormated = `${date.day}-${date.month}-${date.year}`;

    this.totalExpenses$ = generalService.getTotalExpenses(
      this.firstDayOfMonth,
      this.currentDay
    );
    this.totalIncomes$ = generalService.getTotalIncomes(
      this.firstDayOfMonth,
      this.currentDay
    );

    this.total$ = combineLatest([this.totalIncomes$, this.totalExpenses$]).pipe(
      map(([totalIncomes, totalExpenses]) => totalIncomes - totalExpenses)
    );
  }
}
