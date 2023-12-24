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
  orderBy,
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

  addNewExpense(data: Object) {
    const dbInstance = collection(this.fs, 'mymoney-expenses2');
    return addDoc(dbInstance, data);
  }
  deleteExpense(id: string) {
    const docInstance = doc(this.fs, 'mymoney-expenses2', id);
    return deleteDoc(docInstance);
  }

  updateExpense(id: string, data: object) {
    const docInstance = doc(this.fs, 'mymoney-expenses2', id);
    return updateDoc(docInstance, data);
  }

  getExpenses(firstDay: string, lastDay: string): Observable<any[]> {
    const collectionInstance = collection(this.fs, 'mymoney-expenses2');
    const queryByDay = query(
      collectionInstance,
      where('date', '>=', firstDay),
      where('date', '<=', lastDay),orderBy('date', 'desc')
    );
    return collectionData(queryByDay, { idField: 'id' });
  }


  getDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const lastDay = new Date(year, Number(month), 0).getDate();
    return {year,month,day,lastDay};
  }

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
