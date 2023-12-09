import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesComponent { }
