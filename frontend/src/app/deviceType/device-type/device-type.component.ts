import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceTypeApiResponse } from 'src/app/models/device-type.model';
import { DeviceTypeService } from 'src/app/services/device-type.service';

@Component({
    selector: 'app-device-type',
    templateUrl: './device-type.component.html',
    styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent implements OnInit {
    deviceTypes$!: Observable<DeviceTypeApiResponse>;

    constructor(private deviceTypeService: DeviceTypeService) { }

    ngOnInit(): void {
        this.getAllDeviceTypes();
    }

    getAllDeviceTypes() {
        this.deviceTypes$ = this.deviceTypeService.getAllDeviceTypes();
    }
}
