import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { distinctUntilChanged, Subscription } from 'rxjs';
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


    statusList: Array<string> = Object.keys(StatusList).filter((key) => isNaN(+key));
    deviceForm: FormGroup | any;
    actionType: string = 'Save';


    constructor(@Inject(MAT_DIALOG_DATA) public device: Device, private formBuilder: FormBuilder, private deviceService: DeviceService, private dialogRef: MatDialogRef<DeviceInputComponent>) { }

    ngOnInit(): void {

        this.buildDeviceForm();
        if (this.device) {
            this.setDeviceForm(this.device);
        }

    }

    get serialNumberControls() {
        return this.deviceForm.controls['serialNumber'];
    }
    get descriptionControls() {
        return this.deviceForm.controls['description'];
    }
    get deviceTypeControls() {
        return this.deviceForm.controls['deviceType'];
    }
    get statusControls() {
        return this.deviceForm.controls['status'];
    }
    get datePurchasedControls() {
        return this.deviceForm.controls['datePurchased'];
    }

    buildDeviceForm() {
        this.deviceForm = this.formBuilder.group({
            serialNumber: [
                '',
                {
                    validators: [Validators.required],
                    asyncValidators: [uniqueDeviceSerialValidator(this.deviceService, this.device?.serialNumber)],
                    updateOn: 'blur'
                }
            ],
            description: ['', Validators.required],
            deviceType: ['', Validators.required],
            status: ['', Validators.required],
            datePurchased: ['', Validators.required]
        });
    }


    setDeviceForm(device: Device) {
        this.actionType = 'Update';
        this.serialNumberControls.setValue(device.serialNumber);
        this.descriptionControls.setValue(device.description);
        this.deviceTypeControls.setValue(device.deviceType._id);
        this.statusControls.setValue(`${device.status}`);
        this.datePurchasedControls.setValue(device.datePurchased);
    }


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

    //UNUSED case of watching serialNumber input and setting validators accordingly
    setSerialNumberValidator() {
        const serialNumberControl = this.deviceForm.get('serialNumber');
        serialNumberControl
            .valueChanges.pipe(distinctUntilChanged())
            .subscribe((serialNumber: string) => {

                if (serialNumber === this.device.serialNumber) {
                    serialNumberControl.setValidators(null);
                    serialNumberControl.updateValueAndValidity();
                }
            });
    }
}
//TEMPORARY! DELETE WHEN DEVICE-TYPE FUNCTIONALITY IS ADDED
interface DeviceType {
    value: string;
    viewValue: string;
}


