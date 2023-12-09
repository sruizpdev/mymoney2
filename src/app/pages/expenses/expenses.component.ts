import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent { }
