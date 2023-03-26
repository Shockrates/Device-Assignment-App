import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EmployeeListComponent } from 'src/app/assign/employee-list/employee-list.component';
import { Device, DeviceApiRequest } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';

@Component({
    selector: 'app-device-info',
    templateUrl: './device-info.component.html',
    styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {
    id: string = '';
    device$!: Observable<Device>;
    subscription!: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private deviceService: DeviceService, private dialog: MatDialog) { }

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        this.id = routeParams.get('id') || '';
        this.getDevice(this.id);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        //this.notifierSubscription.unsubscribe();
    }

    getDevice(id: string) {
        this.device$ = this.deviceService.getDevice(id);
    }

    unassignDevice(device: Device) {
        const selectedDevice: DeviceApiRequest = {
            ...device,
            deviceType: device.deviceType._id,
            employee: null
        };
        this.deviceService.updateDevice(selectedDevice, selectedDevice._id).subscribe({
            next: (res) => {
                this.getDevice(this.id);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    openEmployeeList(device: Device) {
        this.subscription = this.dialog
            .open(EmployeeListComponent, {
                width: '40%',
                data: device
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'assigned') {
                    this.getDevice(this.id);
                }
            });
    }


}
