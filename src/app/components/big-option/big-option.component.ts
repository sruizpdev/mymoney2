import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-big-option',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './big-option.component.html',
  styleUrl: './big-option.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BigOptionComponent { 

  @Input() image:string=''
  @Input() txt:string=''
  @Input() action:string=''
  
 
}
