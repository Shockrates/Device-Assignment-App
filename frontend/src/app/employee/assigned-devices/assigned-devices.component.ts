import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device.model';

@Component({
    selector: 'app-assigned-devices',
    templateUrl: './assigned-devices.component.html',
    styleUrls: ['./assigned-devices.component.scss']
})
export class AssignedDevicesComponent implements OnInit {
    @Input()
    devices!: Device[];

    constructor() {}

    ngOnInit(): void {}

    unassignDevice(deviceId: Device) {}
}
