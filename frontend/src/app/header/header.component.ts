import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceInputComponent } from '../device/device-input/device-input.component';
import { EmployeeInputComponent } from '../employee/employee-input/employee-input.component';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private dataService: DataStoreService) { }

  ngOnInit(): void {
  }

  openEmployeeDialog() {
    this.dialog.open(EmployeeInputComponent, {
      width: '40%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.notifyForChange();
      }
    });
  }

  openDeviceDialog() {
    this.dialog.open(DeviceInputComponent, {
      width: '40%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.notifyForChange();
      }
    });
  }

  notifyForChange() {
    this.dataService.notifyAboutChange();
  }


}
