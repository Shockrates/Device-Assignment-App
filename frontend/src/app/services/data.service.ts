import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private employeeSource = new BehaviorSubject<Employee>(new Employee("",""));
  employee = this.employeeSource.asObservable()
  constructor() { }

  changeEmployee(employee: Employee) {
    this.employeeSource.next(employee);
  }
}
