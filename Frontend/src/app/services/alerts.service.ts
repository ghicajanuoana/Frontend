import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private alertsSubject = new Subject<any>();

  alerts$ = this.alertsSubject.asObservable();

  addAlert(alert: any) {
    this.alertsSubject.next(alert);
  }
}
