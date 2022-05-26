import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AssignDeviceComponent } from 'src/app/assign/assign-device/assign-device.component';

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
    // employee!: Employee;
    subscription!: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, private dialog: MatDialog) {}

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const employeeIdFromRoute = routeParams.get('id') || '';

        // this.subscription = this.employeeService.getEmployee(employeeIdFromRoute).subscribe({
        //     next: (data) => {
        //         this.employee = data;
        //         //console.log(this.employee);
        //     },
        //     error: (err) => {
        //         console.log(err);
        //     }
        // });
        this.employee$ = this.employeeService.getEmployee(employeeIdFromRoute);
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

    openAssignDevice() {
        this.dialog.open(AssignDeviceComponent, {
            width: '40%'
        });
        //     .afterClosed()
        //     .subscribe((val) => {
        //         if (val === 'update') {
        //             this.getAllDevices();
        //         }
        //     });
        // this.subscriptions.push(sub);
    }
}
