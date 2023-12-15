import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-last-movement',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './last-movement.component.html',
  styleUrl: './last-movement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastMovementComponent { }
