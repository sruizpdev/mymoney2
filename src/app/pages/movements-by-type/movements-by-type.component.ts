import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../general.service';
import { Observable, map } from 'rxjs';

interface Month {
  firstDay: string;
  lastDay: string;
}

interface TypeMovements {
  type: string;
  total: number;
}
@Component({
  selector: 'app-movements-by-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movements-by-type.component.html',
  styleUrl: './movements-by-type.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementsByTypeComponent {
  router = inject(Router);
  month: string = '';
  year: string = '';
  date: string = '';
  data$!: Observable<any[]>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {
    this.activatedRoute.queryParams.subscribe((val: any) => {
      console.log(val.firstDay, val.lastDay);
      this.loadData(val.firstDay, val.lastDay);
    });
  }
  data2: any;
  loadData(firstDay: string, lastDay: string) {
    console.log(firstDay);

    this.month = new Date(firstDay).toLocaleDateString('es-ES', {
      month: 'long',
    });
    this.year = new Date(firstDay).toLocaleDateString('es-ES', {
      year: 'numeric',
    });
    this.date = `${this.month} - ${this.year}`;
    this.data$ = this.generalService.getExpenses(firstDay, lastDay).pipe(
      map((res) => {
        const groupedMovements: { [key: string]: number } = {};

        res.forEach((item) => {
          const type = item.type;
          const amount = item.amount;

          if (!groupedMovements[type]) {
            groupedMovements[type] = Number(amount);
          } else {
            groupedMovements[type] += Number(amount);
          }
        });

        const newArrayMovements: TypeMovements[] = Object.keys(groupedMovements)
          .map((type) => {
            return {
              type: type,
              total: groupedMovements[type],
            };
          })
          .sort((a, b) => b.total - a.total);
        console.log(newArrayMovements);

        return newArrayMovements;
      })
    );

    // this.data2=[{
    //   type:'coche',
    //  total:2300
    // },{
    //   type:'piso',
    //  total:2000
    // },{
    //   type:'comida',
    //  total:200
    // }]
  }
}
