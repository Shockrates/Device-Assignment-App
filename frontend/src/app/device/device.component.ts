import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Device } from '../models/device.model';
import { DataStoreService } from '../services/data-store.service';
import { DeviceService } from '../services/device.service';
import { DeleteConfirmationComponent } from '../shared/delete-confirmation/delete-confirmation.component';
import { StatusList } from '../shared/status-list';
import { DeviceInputComponent } from './device-input/device-input.component';

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
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
        },
        {
            columnDef: 'datePurchased',
            header: 'Purchased at',
            cell: (device: Device) => `${new Date(device.datePurchased).toLocaleDateString('el-GR')}`
        },
        {
            columnDef: 'employeeId',
            header: 'Assign to',
            cell: (device: Device) => `${device.employee?.name || 'Unassigned'}`
        }
    ];

    displayedColumns: string[] = this.columns.map((c) => c.columnDef).concat(['actions']);

    subscriptions: Subscription[] = [];

    employees: Array<Device> = [];

    constructor(private dialog: MatDialog, private deviceService: DeviceService, private router: Router, private dataService: DataStoreService) {}

    ngOnInit(): void {
        this.getAllDevices();
    }

    ngOnDestroy() {
        //this.notifierSubscription.unsubscribe();
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    notifierSubscription: Subscription = this.dataService.subjectNotifier.subscribe((notified) => {
        // originator has notified me. refresh my data here.
        this.getAllDevices();
    });

    getAllDevices() {
        var sub = this.deviceService.getAllDevices().subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res.devices);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => {
                alert('Error while fetching');
            }
        });
        this.subscriptions.push(sub);
    }

    select(row: Device) {}

    editDevice(e: MouseEvent, row: any) {
        e.stopImmediatePropagation();
        var sub = this.dialog
            .open(DeviceInputComponent, {
                width: '40%',
                data: row
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'update') {
                    this.getAllDevices();
                }
            });
        this.subscriptions.push(sub);
    }

    openConfirmDelete(e: MouseEvent, row: Device) {
        e.stopImmediatePropagation();
        var sub = this.dialog
            .open(DeleteConfirmationComponent, {
                width: '40%',
                data: `Employee number: ${row.serialNumber}. Are you sure you want to delete?`
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'delete') {
                    this.deleteDevice(row._id);
                }
            });
        this.subscriptions.push(sub);
    }

    deleteDevice(_id: string) {
        var sub = this.deviceService.deleteDevice(_id).subscribe({
            next: (res) => {
                this.getAllDevices();
            },
            error: (err) => {
                alert('Error while Deleting');
            }
        });
        this.subscriptions.push(sub);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
