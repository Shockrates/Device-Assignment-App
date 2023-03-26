import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceType } from 'src/app/models/device-type.model';
import { DataStoreService } from 'src/app/services/data-store.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { uniqueDeviceTypeNameValidator } from 'src/app/shared/custom-validation';

@Component({
    selector: 'app-device-type-input',
    templateUrl: './device-type-input.component.html',
    styleUrls: ['./device-type-input.component.scss']
})
export class DeviceTypeInputComponent implements OnInit {
    @Input()
    deviceType!: DeviceType;
    public value: string = '';
    deviceTypeForm: FormGroup | any;

    constructor(private formBuilder: FormBuilder, private deviceTypeService: DeviceTypeService, private dataService: DataStoreService) {}

    ngOnInit(): void {
        this.buildDeviceTypeForm();
    }

    get deviceTypeNameControls() {
        return this.deviceTypeForm.controls['name'];
    }

    buildDeviceTypeForm() {
        this.deviceTypeForm = this.formBuilder.group({
            name: [
                '',
                {
                    validators: [Validators.required],
                    asyncValidators: [uniqueDeviceTypeNameValidator(this.deviceTypeService, this.deviceType?.name)],
                    updateOn: 'blur'
                }
            ]
        });
    }

    addDeviceType() {
        if (this.deviceTypeForm.valid) {
            this.deviceTypeService.createDeviceType(this.deviceTypeForm.value).subscribe({
                next: (res) => {
                    this.deviceTypeForm.reset();
                    this.notifyForChange();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    }

    notifyForChange() {
        this.dataService.notifyAboutChange();
    }
}
