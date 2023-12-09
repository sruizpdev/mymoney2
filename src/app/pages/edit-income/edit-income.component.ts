import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './edit-income.component.html',
  styleUrl: './edit-income.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent { }
