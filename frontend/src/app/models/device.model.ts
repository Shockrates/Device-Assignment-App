import { DeviceType } from './device-type.model';
import { Employee } from './employee.model';

export class Device {
    serialNumber: string;
    description: string;
    deviceType: DeviceType;
    status: number;
    datePurchased: Date;
    employee?: Employee;
    _id?: any;

    constructor(serialNumber: string, description: string, deviceType: DeviceType, status: number, datePurchased: Date, employee?: Employee, _id?: any) {
        this.serialNumber = serialNumber;
        this.description = description;
        this.deviceType = deviceType;
        this.status = status;
        this.datePurchased = datePurchased;
        this.employee = employee;
        this._id = _id;
    }
}

export interface DeviceApiResponse {
    devices: Device[];
}

export interface DeviceApiRequest {
    serialNumber: string;
    description: string;
    deviceType: string;
    status: number;
    datePurchased: Date;
    employee: string;
    _id?: any;
}
