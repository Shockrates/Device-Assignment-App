import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { DeviceService } from '../services/device.service';
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

export function uniqueDeviceSerialValidator(deviceService: DeviceService): AsyncValidatorFn {
    return (c: AbstractControl) => {
        return deviceService.getAllDevices().pipe(
            map((res) => {
                const device = res.devices.find((device) => device.serialNumber.toLowerCase() == c.value.toLowerCase());
                return device ? { emailExists: true } : null;
            })
        );
    };
}
