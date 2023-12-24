import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-income',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-income.component.html',
  styleUrl: './new-income.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewIncomeComponent {
  newIncomeForm = new FormGroup({
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
      amount: this.newIncomeForm.value.amount,
      date: this.newIncomeForm.value.date,

      type: this.newIncomeForm.value.type,
      notes: this.newIncomeForm.value.notes?.trim(),
    };
    let errorMessage = '';

    if (this.newIncomeForm.invalid) {
      if (this.newIncomeForm.get('amount')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca una cantidad.\n';
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
      console.log('Introduciendo datos');
      
    }
  }
}
