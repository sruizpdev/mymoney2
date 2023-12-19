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
  updateDoc,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private fs: Firestore) {}

  getAllExpenses() {
    const collectionInstance = collection(this.fs, 'incomes');
    return collectionData(collectionInstance, { idField: 'id' });
  }

  copy() {
    this.getAllExpenses().subscribe((res) => {
      res.forEach((element) => {
        const dbInstance = collection(this.fs, 'mymoney-incomes');

        const mergedDate = `${element['year']}-${element['month']}-${element['day']}`;

        const elementWithoutId = { ...element };
        delete elementWithoutId.id;
        delete elementWithoutId['day'];
        delete elementWithoutId['month'];
        delete elementWithoutId['year'];

        addDoc(dbInstance, { ...elementWithoutId, date: mergedDate });
      });
    });
  }
}
