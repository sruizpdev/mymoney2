import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-total-income',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './total-income.component.html',
  styleUrl: './total-income.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalIncomeComponent { }
