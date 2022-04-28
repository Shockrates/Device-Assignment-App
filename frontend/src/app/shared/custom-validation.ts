import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

export function uniqueEmailValidator(employeeService: EmployeeService): AsyncValidatorFn {
    return (c: AbstractControl) => {
        return employeeService.getAllEmployees().pipe(
            map((res) => {
                const employee = res.employees.find((employee) => employee.email.toLowerCase() == c.value.toLowerCase());
                return employee ? { emailExists: true } : null;
            })
        );
    };
}
