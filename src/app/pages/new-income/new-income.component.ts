import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-new-income',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-income.component.html',
  styleUrl: './new-income.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewIncomeComponent {
  router = inject(Router);
  errMsg: string = '';
  constructor(private generalService: GeneralService) { }

  newIncomeForm = new FormGroup({
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
      amount: this.newIncomeForm.value.amount,
      date: this.newIncomeForm.value.date,

      type: this.newIncomeForm.value.type,
      notes: this.newIncomeForm.value.notes?.trim(),
    };

    let errorMessage = '';

    if (this.newIncomeForm.invalid) {
      if (this.newIncomeForm.get('amount')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca una cantidad.\n';
      } else {
        const amountValue = this.newIncomeForm.get('amount')?.value;
        if (!amountValue || !/^\d+([\.,]\d{1,2})?$/.test(amountValue)) {
          errorMessage +=
            'Por favor, introduzca un formato de cantidad válido.\n(Máximo dos decimales)';
        }
      }
      if (this.newIncomeForm.get('date')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione una fecha.\n';
      }
      if (this.newIncomeForm.get('type')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione un tipo.\n';
      }
      if (this.newIncomeForm.get('notes')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca una descripción.\n';
      }

      // Muestra el mensaje de alerta acumulado
      if (errorMessage) {
        alert(errorMessage);
      }
    } else {
      this.generalService
        .addNewIncome(data)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
