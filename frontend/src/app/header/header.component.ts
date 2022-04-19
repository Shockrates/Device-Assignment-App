import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeInputComponent } from '../employee/employee-input/employee-input.component';
import { EmployeeStoreService } from '../services/employeeStore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private employeeStoreService: EmployeeStoreService) { }

  ngOnInit(): void {
  }

  openEmployeeDialog() {
    this.dialog.open(EmployeeInputComponent, {
      width: '40%',
    }).afterClosed().subscribe(val=>{
      if (val==='save'){
        this.notifyForChange(); 
      }
    });
  }

  notifyForChange() {
    this.employeeStoreService.notifyAboutChange();
  }


}
