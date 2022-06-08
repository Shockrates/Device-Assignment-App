import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Device, DeviceApiRequest, DeviceApiResponse } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';
import { StatusList } from 'src/app/shared/status-list';

@Component({
    selector: 'app-assign-device',
    templateUrl: './assign-device.component.html',
    styleUrls: ['./assign-device.component.scss']
})
export class AssignDeviceComponent implements OnInit {
    dataSource!: MatTableDataSource<Device>;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;

    statusList: Array<string> = Object.keys(StatusList).filter((key) => isNaN(+key));
    columns = [
        {
            columnDef: 'serialNumber',
            header: 'Seral-Number',
            cell: (device: Device) => `${device.serialNumber}`
        },
        {
            columnDef: 'description',
            header: 'Description',
            cell: (device: Device) => `${device.description}`
        },
        {
            columnDef: 'deviceType',
            header: 'Type',
            cell: (device: Device) => `${device.deviceType.name}`
        },
        {
            columnDef: 'status',
            header: 'Status',
            cell: (device: Device) => `${this.statusList[device.status]}`
        }
    ];
    displayedColumns: string[] = this.columns.map((c) => c.columnDef);
    subscriptions: Subscription[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public employeeId: string, private deviceService: DeviceService, private dialogRef: MatDialogRef<AssignDeviceComponent>) {}

    ngOnInit(): void {
        this.populate();
    }

    populate() {
        var sub = this.deviceService.getUnasignedDevices().subscribe({
            next: (res) => {
                console.log(res);

                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => {
                console.log(err);
            }
        });
        this.subscriptions.push(sub);
    }

    assign(row: Device) {
        const device: DeviceApiRequest = {
            ...row,
            deviceType: row.deviceType._id,
            employee: this.employeeId
        };
        this.deviceService.updateDevice(device, row._id).subscribe({
            next: (res) => {
                this.dialogRef.close('assigned');
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
