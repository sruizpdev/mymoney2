import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent { }
