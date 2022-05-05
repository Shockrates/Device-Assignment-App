export class Device {
    serialNumber: string;
    description: string;
    deviceType: string;
    status: number;
    datePurchased: Date;
    employee: string;

    constructor(serialNumber: string, description: string, deviceType: string, status: number, datePurchased: Date, employee?: any, _id?: any) {
        this.serialNumber = serialNumber;
        this.description = description;
        this.deviceType = deviceType;
        this.status = status;
        this.datePurchased = datePurchased;
        this.employee = employee;
    }
}

export interface DeviceApiResponse {
    devices: Device[];
}
