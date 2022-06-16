import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Device, DeviceApiRequest } from 'src/app/models/device.model';
import { Employee, EmployeeApiResponse } from 'src/app/models/employee.model';
import { DeviceService } from 'src/app/services/device.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
    employees$!: Observable<EmployeeApiResponse>;
    //employees!: Employee[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public device: Device,
        private deviceService: DeviceService,
        private employeeService: EmployeeService,
        private dialogRef: MatDialogRef<EmployeeListComponent>
    ) {}

    ngOnInit(): void {
        this.dialogRef.updatePosition({
            top: `20%`
        });
        this.getAllEmployees();
    }

    getAllEmployees() {
        this.employees$ = this.employeeService.getAllEmployees();
    }

    assignTo(employeeId: string) {
        const device: DeviceApiRequest = {
            ...this.device,
            deviceType: this.device.deviceType._id,
            employee: employeeId
        };
        this.deviceService.updateDevice(device, this.device._id).subscribe({
            next: (res) => {
                this.dialogRef.close('assigned');
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}
