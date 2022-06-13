import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { DeviceService } from '../services/device.service';
import { EmployeeService } from '../services/employee.service';

export function uniqueEmailValidator(employeeService: EmployeeService, email: string): AsyncValidatorFn {
    return (c: AbstractControl) => {
        return employeeService.getAllEmployees().pipe(
            map((res) => {
                const employee = res.employees.find((employee) => employee.email.toLowerCase() == c.value.toLowerCase());
                return (employee && employee.email !== email) ? { emailExists: true } : null;
            })
        );
    };
}

export function uniqueDeviceSerialValidator(deviceService: DeviceService, serial: string): AsyncValidatorFn {
    return (c: AbstractControl) => {
        return deviceService.getAllDevices().pipe(
            map((res) => {
                const device = res.devices.find((device) => device.serialNumber.toLowerCase() == c.value.toLowerCase());
                return (device && device.serialNumber !== serial) ? { serialExists: true } : null;
            })
        );
    };
}
