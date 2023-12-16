import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResumeComponent } from '../../components/resume/resume.component';
import { TotalExpenseComponent } from '../../components/total-expense/total-expense.component';
import { TotalIncomeComponent } from '../../components/total-income/total-income.component';
import { BigOptionComponent } from '../../components/big-option/big-option.component';
import { LastMovementComponent } from '../../components/last-movement/last-movement.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ResumeComponent,
    TotalExpenseComponent,
    TotalIncomeComponent,
    BigOptionComponent,
    LastMovementComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
 
 
}
