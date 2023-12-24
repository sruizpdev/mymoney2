import { GeneralService } from './../../general.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-expense.component.html',
  styleUrl: './new-expense.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewExpenseComponent {
  router = inject(Router);

  constructor(private generalService: GeneralService) {}

  newExpenseForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    date: new FormControl(this.getCurrentDay(), [Validators.required]),
    type: new FormControl('', [Validators.required]),
    notes: new FormControl('',[Validators.required]),
  });

  getCurrentDay() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    const data = {
      amount: this.newExpenseForm.value.amount,
      date: this.newExpenseForm.value.date,

      type: this.newExpenseForm.value.type,
      notes: this.newExpenseForm.value.notes?.trim(),
    };
    console.log(data);

    this.generalService
      .addNewExpense(data)
      .then(() => {
        this.router.navigate(['/expenses']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
