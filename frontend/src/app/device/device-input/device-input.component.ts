import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';
import { StatusList } from 'src/app/shared/status-list';
import { uniqueDeviceSerialValidator } from 'src/app/shared/custom-validation';

@Component({
    selector: 'app-device-input',
    templateUrl: './device-input.component.html',
    styleUrls: ['./device-input.component.scss']
})
export class DeviceInputComponent implements OnInit {
    private subscription!: Subscription;

    //TEMPORARY! DELETE WHEN DEVICE-TYPE FUNCTIONALITY IS ADDED
    devices: DeviceType[] = [
        { value: '625bfc47cb180f96a912ece2', viewValue: 'Laptop' },
        { value: '625bfc4dcb180f96a912ece5', viewValue: 'Tablet' },
        { value: '625bfc3dcb180f96a912ecdf', viewValue: 'Smartphone' }
    ];

    deviceStatus: string = '';
    statusList: Array<string> = Object.keys(StatusList).filter((key) => isNaN(+key));

    deviceForm: FormGroup | any;
    actionType: string = 'Save';

    constructor(@Inject(MAT_DIALOG_DATA) public device: Device, private formBuilder: FormBuilder, private deviceService: DeviceService, private dialogRef: MatDialogRef<DeviceInputComponent>) {}

    ngOnInit(): void {
        this.deviceForm = this.formBuilder.group({
            serialNumber: [
                '',
                {
                    validators: [Validators.required],
                    asyncValidators: [uniqueDeviceSerialValidator(this.deviceService)],
                    updateOn: 'blur'
                }
            ],
            description: ['', Validators.required],
            deviceType: ['', Validators.required],
            status: ['', Validators.required],
            datePurchased: ['', Validators.required]
        });

        if (this.device) {
            console.log(this.device);

            this.actionType = 'Update';
            this.deviceForm.controls['serialNumber'].setValue(this.device.serialNumber);
            this.deviceForm.controls['description'].setValue(this.device.description);
            this.deviceForm.controls['deviceType'].setValue(this.device.deviceType._id);
            this.deviceForm.controls['status'].setValue(`${this.device.status}`);
            this.deviceForm.controls['datePurchased'].setValue(this.device.datePurchased);
            //console.log(this.data.datePurchased);
        }
    }

    type = new FormControl('', Validators.required);

    submit() {
        if (!this.device) {
            this.addDevice();
        } else {
            this.updateDevice();
        }
    }

    addDevice() {
        if (this.deviceForm.valid) {
            this.deviceService.createDevice(this.deviceForm.value).subscribe({
                next: (res) => {
                    this.deviceForm.reset();
                    this.dialogRef.close('save');
                },
                error: (err) => {
                    //alert("Error while adding new device")
                    console.log(err);
                }
            });
        }
    }

    updateDevice() {
        if (this.deviceForm.valid) {
            this.deviceService.updateDevice(this.deviceForm.value, this.device._id).subscribe({
                next: (res) => {
                    //alert("Device updated");
                    this.deviceForm.reset();
                    this.dialogRef.close('update');
                },
                error: () => {
                    alert('Error while updating device');
                }
            });
        }
    }
}
//TEMPORARY! DELETE WHEN DEVICE-TYPE FUNCTIONALITY IS ADDED
interface DeviceType {
    value: string;
    viewValue: string;
}
