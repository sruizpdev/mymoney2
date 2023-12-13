import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResumeComponent } from '../../shared/resume/resume.component';
import { TotalExpenseComponent } from '../../shared/total-expense/total-expense.component';
import { TotalIncomeComponent } from '../../shared/total-income/total-income.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,ResumeComponent,TotalExpenseComponent,TotalIncomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
