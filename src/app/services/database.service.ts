import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase) {}

  getStartDate(): Observable<any> {
    return this.db.object('relationship/startDate').valueChanges();
  }

  updateCurrentDuration(duration: number): Promise<void> {
    return this.db.object('relationship/currentDuration').set(duration);
  }
}
