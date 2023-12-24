import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-total-expense',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-expense.component.html',
  styleUrl: './total-expense.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalExpenseComponent {
  currentDay: string = '';
  constructor(private generalService: GeneralService) {
    const date = generalService.getDate();
    this.currentDay = `${date.day}-${date.month}-${date.year}`
  }
}
