import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeneralService } from '../../general.service';

interface NuevoTipo {
  dia: string;
  datos: {
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
  
      // Usamos reduce para agrupar por día
      const newArray: NuevoTipo[] = res.reduce((result, item) => {
        // Verificamos si ya existe un elemento para ese día
        const existingItem = result.find((elem: { dia: string; }) => elem.dia === item.date);
  
        if (existingItem) {
          // Si ya existe, simplemente agregamos el elemento a su array de datos
          existingItem.datos.push(item);
        } else {
          // Si no existe, creamos un nuevo elemento con un array que contiene el primer elemento de ese día
          result.push({
            dia: item.date,
            datos: [item]
          });
        }
  
        return result;
      }, []);
  
      console.log(newArray);
      this.data$ = of(newArray)
      
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
