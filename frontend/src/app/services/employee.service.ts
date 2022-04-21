import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeApiResponse } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    employeesList: Employee[] = [];
    baseUrl: String = 'http://localhost:9090/employees/';

    constructor(private http: HttpClient) {}

    //API Call to fetch all Employees from backend. Response contains assign devices _id only
    getAllEmployees(): Observable<EmployeeApiResponse> {
        return this.http.get<EmployeeApiResponse>(`${this.baseUrl}`);
    }

    //API Call to fetch one Employee with id from backend. Response contains assign devices details
    getEmployee(id: string): Observable<Employee> {
        return this.http.get<Employee>(`${this.baseUrl}` + id);
    }

    //Creates new employee
    createEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.baseUrl}`, employee);
    }

    //Updates Employee. Its used to assign Devices to Employee
    updateEmployee(employee: Employee, id: string): Observable<Employee> {
        return this.http.patch<Employee>(`${this.baseUrl}` + id, employee);
    }

    //Deletes Employee
    deleteEmployee(id: string): Observable<Employee> {
        return this.http.delete<Employee>(`${this.baseUrl}` + id);
    }

    getUserByUsername(name: string): Observable<Employee> {
        return this.http.get<Employee>(`${this.baseUrl}` + name);
    }
}
