import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AssignDeviceComponent } from 'src/app/assign/assign-device/assign-device.component';
import { Employee } from 'src/app/models/employee.model';
import { DataStoreService } from 'src/app/services/data-store.service';
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

    constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, private dataService: DataStoreService, private dialog: MatDialog) { }

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        this.id = routeParams.get('id') || '';
        this.getEmployee(this.id);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.notifierSubscription.unsubscribe();
    }

    openAssignDevice() {
        this.subscription = this.dialog
            .open(AssignDeviceComponent, {
                width: '50%',
                data: this.id
            })

            .afterClosed()
            .subscribe((val) => {
                if (val === 'assigned') {
                    this.getEmployee(this.id);
                }
            });
    }

    notifierSubscription: Subscription = this.dataService.subjectNotifier.subscribe((notified) => {
        // originator has notified me. refresh my data here.
        this.getEmployee(this.id);
    });

    getEmployee(id: string) {
        this.employee$ = this.employeeService.getEmployee(id);
    }

}
