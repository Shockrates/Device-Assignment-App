import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Device } from 'src/app/models/device.model';
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
    //employee!: Employee;
    employee$ = new Observable<Employee>();
    devices!: Device[];
    subscription!: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataStoreService, private employeeService: EmployeeService) {}

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const employeeIdFromRoute = routeParams.get('id') || '';

        // this.subscription = this.employeeService.getEmployee(employeeIdFromRoute).subscribe({
        //     next: (data) => {
        //         this.employee = data;
        //         console.log(this.employee);
        //     },
        //     error: (err) => {
        //         //alert("Error while fetching");
        //         console.log(err);
        //     }
        // });
        this.employee$ = this.employeeService.getEmployee(employeeIdFromRoute);
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }
}
