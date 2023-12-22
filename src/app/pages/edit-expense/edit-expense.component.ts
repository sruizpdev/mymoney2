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
    amount: new FormControl('', [Validators.required]),
    date: new FormControl('2023-12-31', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  onSubmit() {
    const data = {
      amount: this.editExpenseForm.value.amount,
      date: this.editExpenseForm.value.date,

      type: this.editExpenseForm.value.type,
      notes: this.editExpenseForm.value.notes?.trim(),
    };

    console.log('estos son lod datos:  ',data);
    
    const res = confirm('¿Está seguro?');
    if (res) {
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
          console.log('Registro eliminado');
          
          
        })
        .catch((err) => console.log(err));
    }
  }
}
