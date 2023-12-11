import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResumeComponent } from '../../shared/resume/resume.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,ResumeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
