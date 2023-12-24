import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ResumeComponent } from '../../components/resume/resume.component';
import { TotalExpenseComponent } from '../../components/total-expense/total-expense.component';
import { TotalIncomeComponent } from '../../components/total-income/total-income.component';
import { BigOptionComponent } from '../../components/big-option/big-option.component';
import { DayTransactionsComponent } from '../../components/day-transactions/day-transactions.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ResumeComponent,
    TotalExpenseComponent,
    TotalIncomeComponent,
    BigOptionComponent,
    DayTransactionsComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  currentDay: string;
  constructor() {
    function getDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      const lastDay = new Date(year, Number(month), 0).getDate();
      return { year, month, day, lastDay };
    }

    this.currentDay = `${getDate().year}-${getDate().month}-${getDate().day}`;
  }
}
