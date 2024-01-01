import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneralService } from '../../general.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent {
  constructor(private generalService: GeneralService) {}

  copiar(): void {
    //alert('funcion deshabilitada');
    this.generalService.copy();
  }



}
