import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Device } from '../models/device.model';
import { DeviceService } from '../services/device.service';

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

  columns = [
    {
      columnDef: 'serialNumber',
      header: 'Seral-Number',
      cell: (device: Device) => `${device.serialNumber}`,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (device: Device) => `${device.description}`,
    },
    {
      columnDef: 'deviceType',
      header: 'Type',
      cell: (device: Device) => `${device.deviceType.name}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (device: Device) => `${device.status}`,
    },
    {
      columnDef: 'datePurchased',
      header: 'Purchased at',
      cell: (device: Device) => `${new Date(device.datePurchased).toLocaleDateString("el-GR")}`,
    },
    {
      columnDef: 'employeeId',
      header: 'Assign to',
      cell: (device: Device) => `${device.employee?.name}`,
    }
  ];

  displayedColumns: string[] = this.columns.map(c => c.columnDef).concat(['actions']);

  subscriptions: Subscription[] = []

  employees: Array<Device> = [];

  constructor(private dialog: MatDialog, private deviceService: DeviceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDevices();
  }

  ngOnDestroy() {
    //this.notifierSubscription.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getAllDevices() {
    var sub = this.deviceService.getAllDevices()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res.devices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error: (err) => {
          alert("Error while fetching");
        }
      })
    this.subscriptions.push(sub);
  }

  select(row: Device) { }

  editDevice(e: MouseEvent, row: any) { }

  openConfirmDelete(e: MouseEvent, row: Device) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
