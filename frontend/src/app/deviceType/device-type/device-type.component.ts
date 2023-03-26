import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DeviceTypeApiResponse } from 'src/app/models/device-type.model';
import { DataStoreService } from 'src/app/services/data-store.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';

@Component({
    selector: 'app-device-type',
    templateUrl: './device-type.component.html',
    styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent implements OnInit {
    deviceTypes$!: Observable<DeviceTypeApiResponse>;

    constructor(private deviceTypeService: DeviceTypeService, private dataService: DataStoreService) {}

    ngOnInit(): void {
        this.getAllDeviceTypes();
    }

    notifierSubscription: Subscription = this.dataService.subjectNotifier.subscribe((notified) => {
        // originator has notified me. refresh my data here.
        this.getAllDeviceTypes();
    });

    getAllDeviceTypes() {
        this.deviceTypes$ = this.deviceTypeService.getAllDeviceTypes();
    }
}
