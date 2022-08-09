import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-device-type-input',
    templateUrl: './device-type-input.component.html',
    styleUrls: ['./device-type-input.component.scss']
})
export class DeviceTypeInputComponent implements OnInit {
    public value: string = '';

    constructor() {}

    ngOnInit(): void {}

    submit() {}
}
