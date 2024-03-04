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
  errMsg: string = '';
  constructor(private generalService: GeneralService) { }

  newExpenseForm = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+([\.,]\d{1,2})?$/),
    ]),
    date: new FormControl(this.getCurrentDay(), [Validators.required]),
    type: new FormControl('', [Validators.required]),
    notes: new FormControl('', [Validators.required]),
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

    let errorMessage = '';

    if (this.newExpenseForm.invalid) {
      if (this.newExpenseForm.get('amount')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca una cantidad.\n';
      } else {
        const amountValue = this.newExpenseForm.get('amount')?.value;
        if (!amountValue || !/^\d+([\.,]\d{1,2})?$/.test(amountValue)) {
          errorMessage +=
            'Por favor, introduzca un formato de cantidad válido.\nMáximo dos decimales';
        }
      }
      if (this.newExpenseForm.get('date')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione una fecha.\n';
      }
      if (this.newExpenseForm.get('type')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione un tipo.\n';
      }
      if (this.newExpenseForm.get('notes')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca una descripción.\n';
      }

      // Muestra el mensaje de alerta acumulado
      if (errorMessage) {
        alert(errorMessage);
      }
    } else {
      this.generalService
        .addNewExpense(data)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
