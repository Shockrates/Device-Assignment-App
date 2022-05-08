import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private employeeSource = new BehaviorSubject<Employee>(new Employee("", ""));
  employee$ = this.employeeSource.asObservable()

  subjectNotifier: Subject<void> = new Subject<void>();

  constructor() { }

  changeEmployee(employee: Employee) {
    this.employeeSource.next(employee);
  }

  notifyAboutChange() {
    this.subjectNotifier.next();
  }
}
