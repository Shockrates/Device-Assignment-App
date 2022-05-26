import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';

@Component({
    selector: 'app-device-info',
    templateUrl: './device-info.component.html',
    styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {
    id: string = '';
    device$!: Observable<Device>;
    device!: Device;

    constructor(private router: Router, private route: ActivatedRoute, private deviceService: DeviceService) {}

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const deviceIdFromRoute = routeParams.get('id') || '';

        this.device$ = this.deviceService.getDevice(deviceIdFromRoute);
    }
}
