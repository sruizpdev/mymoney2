import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditExpenseComponent { }
