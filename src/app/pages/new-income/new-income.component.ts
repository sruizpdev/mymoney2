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
    day: new FormControl(''),
    month: new FormControl(''),
    year: new FormControl(''),
    type: new FormControl('', [Validators.required]),
    notes: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const data = {
      amount: this.newIncomeForm.value.amount,
      day: this.newIncomeForm.value.day?.trim(),
      month: this.newIncomeForm.value.month?.trim(),
      year: this.newIncomeForm.value.year?.trim(),
      type: this.newIncomeForm.value.type,
      notes: this.newIncomeForm.value.notes?.trim(),
    };
    console.log(data);

    // };
    // this.userService
    //   .addNew(data)
    //   .then(() => {
    //     this.router.navigate(['/home']);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}
