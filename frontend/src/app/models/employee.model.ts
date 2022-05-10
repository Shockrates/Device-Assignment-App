import { Device } from './device.model';

export class Employee {
    employeeId: any;
    _id: any;
    name: string;
    email: string;
    devices_info!: Device[];

    constructor(name: string, email: string, employeeId?: any, _id?: any) {
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this._id = _id;
    }

    getEmployeeInfo() {
        return {
            id: this.employeeId,
            name: this.name,
            email: this.email
        };
    }
}

export interface EmployeeApiResponse {
    employees: Employee[];
}
