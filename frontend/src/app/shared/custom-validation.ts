import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { DeviceTypeService } from '../services/device-type.service';
import { DeviceService } from '../services/device.service';
import { EmployeeService } from '../services/employee.service';

export function uniqueEmailValidator(employeeService: EmployeeService, email: string): AsyncValidatorFn {
    return (c: AbstractControl) => {
        return employeeService.getAllEmployees().pipe(
            map((res) => {
                const employee = res.employees.find((employee) => employee.email.toLowerCase() == c.value.toLowerCase());
                return employee && employee.email !== email ? { emailExists: true } : null;
            })
        );
    };
}

export function uniqueDeviceSerialValidator(deviceService: DeviceService, serial: string): AsyncValidatorFn {
    return (c: AbstractControl) => {
        return deviceService.getAllDevices().pipe(
            map((res) => {
                const device = res.devices.find((device) => device.serialNumber.toLowerCase() == c.value.toLowerCase());
                return device && device.serialNumber !== serial ? { serialExists: true } : null;
            })
        );
    };
}

export function uniqueDeviceTypeNameValidator(deviceTypeService: DeviceTypeService, name: string): AsyncValidatorFn {
    return (c: AbstractControl) => {
        return deviceTypeService.getAllDeviceTypes().pipe(
            map((res) => {
                const deviceType = res.deviceTypes.find((deviceType) => deviceType.name.toLowerCase() == c.value.toLowerCase());
                return deviceType && deviceType.name !== name ? { nameExists: true } : null;
            })
        );
    };
}
