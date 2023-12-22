import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeneralService } from '../../general.service';

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
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {
  data$: Observable<any[]>;

  constructor(private generalService: GeneralService) {
    this.data$ = generalService.getExpensesByDay('2023-11-01', '2023-11-30');
    this.data$.subscribe((res) => {
      console.log(res);

      const newArray: DailyMovements[] = res.reduce((result, item) => {
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
      }, []);

      console.log(newArray);
      this.data$ = of(newArray);
    });
  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = this.agregarCeroAlMes(fecha.getMonth() + 1); // Sumar 1 porque los meses comienzan desde 0
    const day = this.agregarCeroAlDia(fecha.getDate());

    return `${year}-${month}-${day}`;
  }

  agregarCeroAlMes(mes: number): string {
    return mes < 10 ? `0${mes}` : `${mes}`;
  }

  agregarCeroAlDia(dia: number): string {
    return dia < 10 ? `0${dia}` : `${dia}`;
  }
}
