import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AssignDeviceComponent } from 'src/app/assign/assign-device/assign-device.component';
import { Device } from 'src/app/models/device.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
    selector: 'app-employee-info',
    templateUrl: './employee-info.component.html',
    styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
    id: string = '';
    employee$!: Observable<Employee>;
    subscription!: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, private dialog: MatDialog) {}

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        this.id = routeParams.get('id') || '';
        this.employee$ = this.employeeService.getEmployee(this.id);
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

    openAssignDevice() {
        this.subscription = this.dialog
            .open(AssignDeviceComponent, {
                width: '40%',
                data: this.id
            })

            .afterClosed()
            .subscribe((val) => {
                if (val === 'assigned') {
                    this.employee$ = this.employeeService.getEmployee(this.id);
                }
            });
    }

    unassignDevice(deviceId: Device) {}
}
