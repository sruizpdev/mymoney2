import { GeneralService } from './../../general.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditExpenseComponent {
  router = inject(Router);
  id!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {
    this.activatedRoute.queryParams.subscribe((val: any) => {
      console.log(val.id);
      this.id = val.id;

      this.editExpenseForm.patchValue({
        type: val.type,
        date: val.date,
        amount: val.amount,
        notes: val.notes,
      });
    });
  }

  editExpenseForm = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+([\.,]\d{1,2})?$/),
    ]),
    date: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    notes: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const data = {
      amount: this.editExpenseForm.value.amount,
      date: this.editExpenseForm.value.date,

      type: this.editExpenseForm.value.type,
      notes: this.editExpenseForm.value.notes?.trim(),
    };
    let errorMessage = '';

    if (this.editExpenseForm.invalid) {
      if (this.editExpenseForm.get('amount')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca una cantidad.\n';
      } else {
        const amountValue = this.editExpenseForm.get('amount')?.value;
        if (!amountValue || !/^\d+([\.,]\d{1,2})?$/.test(amountValue)) {
          errorMessage +=
            'Por favor, introduzca un formato de cantidad válido.\n(Máximo dos decimales)';
        }
      }
      if (this.editExpenseForm.get('date')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione una fecha.\n';
      }
      if (this.editExpenseForm.get('type')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione un tipo.\n';
      }
      if (this.editExpenseForm.get('notes')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca una descripción.\n';
      }

      // Muestra el mensaje de alerta acumulado
      if (errorMessage) {
        alert(errorMessage);
      }
    } else {
      this.generalService
        .updateExpense(this.id, data)
        .then(() => {
          this.router.navigate(['/expenses']);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  delete() {
    const res = confirm('¿Está seguro?');

    if (res) {
      this.generalService
        .deleteExpense(this.id)
        .then(() => {
          this.router.navigate(['/expenses']);
        })
        .catch((err) => console.log(err));
    }
  }
}
