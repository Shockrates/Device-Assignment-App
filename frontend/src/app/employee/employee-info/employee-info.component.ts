import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Device } from 'src/app/models/device.model';
import { Employee } from 'src/app/models/employee.model';
import { DataStoreService } from 'src/app/services/data-store.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
    selector: 'app-employee-info',
    templateUrl: './employee-info.component.html',
    styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
    id: string = '';
    employee!: Employee;
    devices!: Device[];
    subscription!: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataStoreService, private deviceService: DeviceService) {}

    ngOnInit(): void {
        this.subscription = this.dataService.employee$.subscribe({
            next: (data) => {
                this.employee = data;
                console.log(this.employee);
            },
            error: (err) => {
                //alert("Error while fetching");
                console.log(err);
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
