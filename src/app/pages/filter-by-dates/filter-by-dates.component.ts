import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GeneralService } from '../../general.service';
import { Observable, map } from 'rxjs';
import { RouterLink } from '@angular/router';

interface DailyMovements {
  day: string;
  data: {
    amount: number;
    date: string;
    id: string;
    notes: string;
    type: string;
  };
}
@Component({
  selector: 'app-filter-by-dates',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './filter-by-dates.component.html',
  styleUrl: './filter-by-dates.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByDatesComponent {
  msgIncomes: string = 'Ingresos desde';
  msgExpenses: string = 'Gastos desde';
  data$!: Observable<any>;
  dataIncomes$!: Observable<any>;

  constructor(private generalService: GeneralService) {}

  datesForm = new FormGroup({
    initialDate: new FormControl('', [Validators.required]),
    finalDate: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    this.msgIncomes = 'Ingresos desde';
    this.msgExpenses = 'Gastos desde';
    const dates = {
      initialDate: this.datesForm.value.initialDate,
      finalDate: this.datesForm.value.finalDate,
    };

    let errorMessage = '';

    if (this.datesForm.invalid) {
      if (this.datesForm.get('initialDate')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione una fecha inicial.\n';
      }
      if (this.datesForm.get('finalDate')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione una fecha final.\n';
      }

      // Muestra el mensaje de alerta acumulado
      if (errorMessage) {
        alert(errorMessage);
      }
    } else {
      this.data$ = this.generalService
        .getExpenses(dates.initialDate!, dates.finalDate!)
        .pipe(
          map((res) => {
            const newArrayMovements: DailyMovements[] = res.reduce(
              (result, item) => {
                const existingItem = result.find(
                  (elem: { day: string }) => elem.day === item.date
                );
                if (existingItem) {
                  existingItem.data.push(item);
                } else {
                  result.push({
                    day: item.date,
                    data: [item],
                  });
                }
                return result;
              },
              []
            );
            if (newArrayMovements.length == 0) {
              this.msgExpenses = 'No hay gastos entre';
            }
            return newArrayMovements;
          })
        );
      this.dataIncomes$ = this.generalService
        .getIncomes(dates.initialDate!, dates.finalDate!)
        .pipe(
          map((res) => {
            const newArrayMovements: DailyMovements[] = res.reduce(
              (result, item) => {
                const existingItem = result.find(
                  (elem: { day: string }) => elem.day === item.date
                );
                if (existingItem) {
                  existingItem.data.push(item);
                } else {
                  result.push({
                    day: item.date,
                    data: [item],
                  });
                }
                return result;
              },
              []
            );
            if (newArrayMovements.length == 0) {
              this.msgIncomes = 'No hay ingresos entre';
            }
            return newArrayMovements;
          })
        );
    }
  }
}
