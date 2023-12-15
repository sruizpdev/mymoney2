import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-total-expense',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './total-expense.component.html',
  styleUrl: './total-expense.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalExpenseComponent { }
