import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Device, DeviceApiRequest } from 'src/app/models/device.model';
import { DataStoreService } from 'src/app/services/data-store.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
    selector: 'app-assigned-devices',
    templateUrl: './assigned-devices.component.html',
    styleUrls: ['./assigned-devices.component.scss']
})
export class AssignedDevicesComponent implements OnInit {

    @Input()
    devices!: Device[];
    subscriptions: Subscription[] = [];

    constructor(private deviceService: DeviceService, private dataService: DataStoreService) { }

    ngOnInit(): void { }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    unassignDevice(device: Device) {
        const selectedDevice: DeviceApiRequest = {
            ...device,
            deviceType: device.deviceType._id,
            employee: null
        };
        var sub = this.deviceService.updateDevice(selectedDevice, selectedDevice._id).subscribe({
            next: (res) => {
                this.notifyForChange();
            },
            error: (err) => {
                console.log(err);
            }
        });
        this.subscriptions.push(sub);
    }

    notifyForChange() {
        this.dataService.notifyAboutChange();
    }
}

