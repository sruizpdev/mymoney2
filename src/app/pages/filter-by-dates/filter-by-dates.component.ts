import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-filter-by-dates',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './filter-by-dates.component.html',
  styleUrl: './filter-by-dates.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByDatesComponent { }
