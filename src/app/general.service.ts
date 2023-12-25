import { Injectable, inject } from '@angular/core';

import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  
  constructor(private fs: Firestore, private auth: Auth) {}

  isLogged(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  // login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  whoIsLogged() {
    return this.auth.currentUser?.uid;
  }

  getAllExpenses(): Observable<any[]> {
    const collectionInstance = collection(this.fs, 'mymoney-expenses2'); //Esta es una collection temporal de datos
    return collectionData(collectionInstance, { idField: 'id' });
  }
  getAllIncomes(): Observable<any[]> {
    const collectionInstance = collection(this.fs, 'mymoney-incomes2'); //Esta es una collection temporal de datos
    return collectionData(collectionInstance, { idField: 'id' });
  }

  addNewExpense(data: Object) {
    const dbInstance = collection(this.fs, 'mymoney-expenses2');
    return addDoc(dbInstance, data);
  }
  addNewIncome(data: Object) {
    const dbInstance = collection(this.fs, 'mymoney-incomes2');
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
  deleteIncome(id: string) {
    const docInstance = doc(this.fs, 'mymoney-incomes2', id);
    return deleteDoc(docInstance);
  }

  updateIncome(id: string, data: object) {
    const docInstance = doc(this.fs, 'mymoney-incomes2', id);
    return updateDoc(docInstance, data);
  }

  getExpenses(firstDay: string, lastDay: string): Observable<any[]> {
    const collectionInstance = collection(this.fs, 'mymoney-expenses2');
    const queryByDay = query(
      collectionInstance,
      where('date', '>=', firstDay),
      where('date', '<=', lastDay),
      orderBy('date', 'desc'),
    );
    return collectionData(queryByDay, { idField: 'id' });
  }
  getLastExpenses(): Observable<any[]> {
    const collectionInstance = collection(this.fs, 'mymoney-expenses2');

    // Paso 1: Obtener la fecha del último documento introducido
    const queryLatestDate = query(
      collectionInstance,
      orderBy('date', 'desc'),
      limit(1)
    );

    return collectionData(queryLatestDate, { idField: 'id' }).pipe(
      // Paso 2: Realizar una nueva consulta para obtener todos los documentos con la misma fecha
      switchMap((latestDocuments) => {
        if (latestDocuments.length > 0) {
          const latestDate = latestDocuments[0]['date'];

          const queryByLatestDate = query(
            collectionInstance,
            where('date', '==', latestDate)
          );

          return collectionData(queryByLatestDate, { idField: 'id' });
        } else {
          // Si no hay documentos, devolver un array vacío
          return [];
        }
      })
    );
  }
  getIncomes(firstDay: string, lastDay: string): Observable<any[]> {
    const collectionInstance = collection(this.fs, 'mymoney-incomes2');
    const queryByDay = query(
      collectionInstance,
      where('date', '>=', firstDay),
      where('date', '<=', lastDay),
      orderBy('date', 'desc')
    );
    return collectionData(queryByDay, { idField: 'id' });
  }
  getTotalExpenses(firstDay: string, lastDay: string): Observable<number> {
    const collectionInstance = collection(this.fs, 'mymoney-expenses2');
    const queryByDay = query(
      collectionInstance,
      where('date', '>=', firstDay),
      where('date', '<=', lastDay),
      orderBy('date', 'desc')
    );
    return collectionData(queryByDay, { idField: 'id' }).pipe(
      map((res) => {
        return Number(
          res.reduce((total, objeto) => total + +objeto['amount'], 0).toFixed(2)
        );
      })
    );
  }
  getTotalIncomes(firstDay: string, lastDay: string): Observable<number> {
    const collectionInstance = collection(this.fs, 'mymoney-incomes2');
    const queryByDay = query(
      collectionInstance,
      where('date', '>=', firstDay),
      where('date', '<=', lastDay),
      orderBy('date', 'desc')
    );
    return collectionData(queryByDay, { idField: 'id' }).pipe(
      map((res) => {
        return Number(
          res.reduce((total, objeto) => total + +objeto['amount'], 0).toFixed(2)
        );
      })
    );
  }

  getDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const lastDay = new Date(year, Number(month), 0).getDate();
    return { year, month, day, lastDay };
  }

  //Esta función copia una collection y formatea varios campos (elimina espacios en blanco, acentos, etc.)
  //TODO hay que hacer lo mismo con los ingresos y formatear el texto nómina para quitarle el acento
  copy() {
    this.getAllIncomes().subscribe((res) => {
      res.forEach((element) => {
        const dbInstance = collection(this.fs, 'mymoney-incomes2'); // o mymoney-expenses, depende

        const mergedDate = `${element['year']}-${element['month']}-${element['day']}`;

        const elementWithoutId = { ...element };

        delete elementWithoutId.id;

        if (elementWithoutId['type'] == 'nómina') {
          elementWithoutId['type'] = 'nomina';
        }
        // if (elementWithoutId['type'] == 'teléfono') {
        //   elementWithoutId['type'] = 'telefono';
        // }

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
