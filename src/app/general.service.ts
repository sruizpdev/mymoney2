import { Injectable, inject } from '@angular/core';

import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
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
    const collectionInstance = collection(this.fs, 'expenses');
    return collectionData(collectionInstance, { idField: 'id' });
  }
}
