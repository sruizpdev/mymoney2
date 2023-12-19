import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent {
  constructor(private generalService: GeneralService) {}

  copiar(): void {
    this.generalService.copy();
  }
}
