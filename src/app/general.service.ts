import { Injectable, inject } from '@angular/core';

import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private fs: Firestore) {}

  getAllExpenses(): Observable<any[]> {
    const collectionInstance = collection(this.fs, 'mymoney-expenses2'); //Esta es una collection temporal de datos
    return collectionData(collectionInstance, { idField: 'id' });
  }

  getExpensesByDay(firstDay: string, lastDay: string): Observable<any[]> {
    const collectionInstance = collection(this.fs, 'mymoney-expenses2');
    const queryByDay = query(
      collectionInstance,
      where('date', '>=', firstDay),
      where('date', '<=', lastDay)
    );
    return collectionData(queryByDay, { idField: 'id' });
  }

  // getExpensesByMonth(): Observable<any[]> {
  //   let day: number = 9;
  //   let mes: Observable<any>[];
  //   for (let index = 0; index < day; index++) {
  //     let x = this.getExpensesByDay(`2023-12-0${index + 1}`).subscribe(
  //       (res) => {
  //         mes[index] = { dia: `2023-12-0${index + 1}`, datos: res };
  //       }
  //     );
  //   }

  //   return mes;
  // }

  //Esta función copia una collection y formatea varios campos (elimina espacios en blanco, acentos, etc.)
  //TODO hay que hacer lo mismo con los ingresos y formatear el texto nómina para quitarle el acento
  copy() {
    this.getAllExpenses().subscribe((res) => {
      res.forEach((element) => {
        const dbInstance = collection(this.fs, 'mymoney-expenses2'); // o mymoney-expenses, depende

        const mergedDate = `${element['year']}-${element['month']}-${element['day']}`;

        const elementWithoutId = { ...element };

        delete elementWithoutId.id;

        if (elementWithoutId['type'] == 'farmacia y salud') {
          elementWithoutId['type'] = 'farmacia';
        }
        if (elementWithoutId['type'] == 'teléfono') {
          elementWithoutId['type'] = 'telefono';
        }

        delete elementWithoutId['day'];
        delete elementWithoutId['month'];
        delete elementWithoutId['year'];

        //ESTA LINEA NO ESTÁ PROBADA
        elementWithoutId['notes'] = elementWithoutId['notes'].trim();

        addDoc(dbInstance, { ...elementWithoutId, date: mergedDate });
        // addDoc(dbInstance, { ...elementWithoutId });
      });
    });
  }
}
