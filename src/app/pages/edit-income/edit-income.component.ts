import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../general.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-income',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './edit-income.component.html',
  styleUrl: './edit-income.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditIncomeComponent {

  router = inject(Router);
  id!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {
    this.activatedRoute.queryParams.subscribe((val: any) => {
      console.log(val.id);
      this.id = val.id;

      this.editIncomeForm.patchValue({
        type: val.type,
        date: val.date,
        amount: val.amount,
        notes: val.notes,
      });
    });
  }

  editIncomeForm = new FormGroup({
    amount: new FormControl('',  [
      Validators.required,
      Validators.pattern(/^\d+([\.,]\d{1,2})?$/),
    ]),
    date: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    notes: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const data = {
      amount: this.editIncomeForm.value.amount,
      date: this.editIncomeForm.value.date,

      type: this.editIncomeForm.value.type,
      notes: this.editIncomeForm.value.notes?.trim(),
    };
    let errorMessage = '';

    if (this.editIncomeForm.invalid) {
      if (this.editIncomeForm.get('amount')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca una cantidad.\n';
      } else {
        const amountValue = this.editIncomeForm.get('amount')?.value;
        if (!amountValue || !/^\d+([\.,]\d{1,2})?$/.test(amountValue)) {
          errorMessage +=
            'Por favor, introduzca un formato de cantidad válido.\n(Máximo dos decimales)';
        }
      }
      if (this.editIncomeForm.get('date')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione una fecha.\n';
      }
      if (this.editIncomeForm.get('type')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione un tipo.\n';
      }
      if (this.editIncomeForm.get('notes')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca una descripción.\n';
      }

      // Muestra el mensaje de alerta acumulado
      if (errorMessage) {
        alert(errorMessage);
      }
    } else {
      const res = confirm('¿Está seguro?');
      if (res) {
        this.generalService
          .updateIncome(this.id, data)
          .then(() => {
            this.router.navigate(['/incomes']);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  delete() {
    const res = confirm('¿Está seguro?');

    if (res) {
      this.generalService
        .deleteIncome(this.id)
        .then(() => {
          this.router.navigate(['/incomes']);
        })
        .catch((err) => console.log(err));
    }
  }
 }
