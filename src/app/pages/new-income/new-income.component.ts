import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-income',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-income.component.html',
  styleUrl: './new-income.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewIncomeComponent {}
